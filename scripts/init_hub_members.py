import firebase_admin
from firebase_admin import credentials, firestore
import csv
import sys
import os

def initialize_firebase(service_account_key_path):
    """
    Initialize Firebase application with the provided service account key.
    """
    if not os.path.exists(service_account_key_path):
        print(f"Service account key file not found at {service_account_key_path}")
        sys.exit(1)
    
    cred = credentials.Certificate(service_account_key_path)
    firebase_admin.initialize_app(cred)
    print("Firebase application initialized successfully.")

# Read data from info.txt and make a dictionary by reading each line and splitting each field by tab
def read_tab_separated_file(file_path):
    data_list = []

    with open(file_path, 'r') as file:
        # Read the first line to get the headers
        headers = file.readline().strip().split('\t')
        
        # Process the rest of the lines
        for line in file:
            # Split the line by tabs
            values = line.strip().split('\t')
            values = [v for v in values if v]  # Remove empty values
            
            # Create a dictionary for this line
            record = dict(zip(headers, values))
            
            # Add the dictionary to the list
            data_list.append(record)
    
    return data_list


def save_users_to_firestore(users):
    """
    Saves a list of user dictionaries to Firestore with email as document ID.
    """
    db = firestore.client()
    success_count = 0
    failure_count = 0
    
    for user in users:
        email = user.get('email')
        if not email:
            print("Skipping record without email:", user)
            failure_count += 1
            continue
        
        try:
            # Clean email to be used as document ID
            doc_id = email.strip().lower()
            db.collection('directory').document(doc_id).set(user)
            print(f"Successfully saved user: {email}")
            success_count += 1
        except Exception as e:
            print(f"Failed to save user {email}: {e}")
            failure_count += 1
    
    print(f"\nFinished uploading users to Firestore.")
    print(f"Successful uploads: {success_count}")
    print(f"Failed uploads: {failure_count}")


def main():
    # Path to your Firebase service account key (replace with your own)
    service_account_key_path = './your-firebase-adminsdk.json'

    # Initialize Firebase
    initialize_firebase(service_account_key_path)
    
    # Read data from the file
    users_data = read_tab_separated_file("./info.txt")
    
    # Save data to Firestore
    save_users_to_firestore(users_data)
    
if __name__ == '__main__':
    main()