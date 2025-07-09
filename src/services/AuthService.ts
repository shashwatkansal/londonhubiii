// Service layer for authentication operations
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { User, ApiResponse } from "@/types";
import { COLLECTIONS } from "@/lib/constants";
import { AuthError, ValidationError, handleApiError, logError } from "@/lib/errors";
import { validateEmail, validatePassword } from "@/lib/validation";

export class AuthService {
  async signIn(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      // Validate input
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        const error = new ValidationError(emailValidation.errors.join(', '));
        return { data: null, error, loading: false };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        const error = new ValidationError(passwordValidation.errors.join(', '));
        return { data: null, error, loading: false };
      }

      // Attempt sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = this.mapFirebaseUser(userCredential.user);

      return { data: user, error: null, loading: false };
    } catch (error: any) {
      let authError: AuthError;
      
      switch (error.code) {
        case 'auth/invalid-email':
          authError = new AuthError('Invalid email address');
          break;
        case 'auth/user-disabled':
          authError = new AuthError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          authError = new AuthError('No account found with this email');
          break;
        case 'auth/wrong-password':
          authError = new AuthError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          authError = new AuthError('Too many failed attempts. Please try again later');
          break;
        default:
          authError = new AuthError('Failed to sign in. Please try again');
      }

      logError(authError, 'AuthService.signIn');
      return { data: null, error: authError, loading: false };
    }
  }

  async signUp(email: string, password: string, displayName?: string): Promise<ApiResponse<User>> {
    try {
      // Validate input
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        const error = new ValidationError(emailValidation.errors.join(', '));
        return { data: null, error, loading: false };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        const error = new ValidationError(passwordValidation.errors.join(', '));
        return { data: null, error, loading: false };
      }

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile if display name provided
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Create user document in Firestore
      const userData = {
        email,
        displayName: displayName || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, COLLECTIONS.USERS, userCredential.user.uid), userData);

      const user = this.mapFirebaseUser(userCredential.user);
      return { data: user, error: null, loading: false };
    } catch (error: any) {
      let authError: AuthError;
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          authError = new AuthError('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          authError = new AuthError('Invalid email address');
          break;
        case 'auth/weak-password':
          authError = new AuthError('Password is too weak');
          break;
        case 'auth/operation-not-allowed':
          authError = new AuthError('Account creation is not allowed');
          break;
        default:
          authError = new AuthError('Failed to create account. Please try again');
      }

      logError(authError, 'AuthService.signUp');
      return { data: null, error: authError, loading: false };
    }
  }

  async signOut(): Promise<ApiResponse<boolean>> {
    try {
      await signOut(auth);
      return { data: true, error: null, loading: false };
    } catch (error) {
      const authError = new AuthError('Failed to sign out');
      logError(authError, 'AuthService.signOut');
      return { data: null, error: authError, loading: false };
    }
  }

  async resetPassword(email: string): Promise<ApiResponse<boolean>> {
    try {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        const error = new ValidationError(emailValidation.errors.join(', '));
        return { data: null, error, loading: false };
      }

      await sendPasswordResetEmail(auth, email);
      return { data: true, error: null, loading: false };
    } catch (error: any) {
      let authError: AuthError;
      
      switch (error.code) {
        case 'auth/invalid-email':
          authError = new AuthError('Invalid email address');
          break;
        case 'auth/user-not-found':
          authError = new AuthError('No account found with this email');
          break;
        default:
          authError = new AuthError('Failed to send password reset email');
      }

      logError(authError, 'AuthService.resetPassword');
      return { data: null, error: authError, loading: false };
    }
  }

  async checkAdminStatus(email: string): Promise<ApiResponse<boolean>> {
    try {
      const adminDocRef = doc(db, COLLECTIONS.ADMINS, email);
      const adminDocSnapshot = await getDoc(adminDocRef);
      
      return { 
        data: adminDocSnapshot.exists(), 
        error: null, 
        loading: false 
      };
    } catch (error) {
      const authError = new AuthError('Failed to check admin status');
      logError(authError, 'AuthService.checkAdminStatus');
      return { data: null, error: authError, loading: false };
    }
  }

  async updateUserProfile(
    uid: string, 
    updates: { displayName?: string; photoURL?: string }
  ): Promise<ApiResponse<User>> {
    try {
      const user = auth.currentUser;
      if (!user || user.uid !== uid) {
        const error = new AuthError('User not authenticated');
        return { data: null, error, loading: false };
      }

      // Update Firebase Auth profile
      await updateProfile(user, updates);

      // Update Firestore user document
      const userDocRef = doc(db, COLLECTIONS.USERS, uid);
      await setDoc(userDocRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      const updatedUser = this.mapFirebaseUser(user);
      return { data: updatedUser, error: null, loading: false };
    } catch (error) {
      const authError = new AuthError('Failed to update profile');
      logError(authError, 'AuthService.updateUserProfile');
      return { data: null, error: authError, loading: false };
    }
  }

  private mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
      updatedAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now()),
    };
  }

  getCurrentUser(): User | null {
    const user = auth.currentUser;
    return user ? this.mapFirebaseUser(user) : null;
  }
}

// Export singleton instance
export const authService = new AuthService();