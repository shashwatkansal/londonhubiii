// Input validation utilities for better data integrity
import { VALIDATION_RULES, ERROR_MESSAGES } from "./constants";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
  } else if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
  } else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateRequired(value: string | undefined | null, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (!value || value.trim() === '') {
    errors.push(`${fieldName} is required`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateStringLength(
  value: string,
  minLength: number,
  maxLength: number,
  fieldName: string
): ValidationResult {
  const errors: string[] = [];
  
  if (value.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters`);
  }
  
  if (value.length > maxLength) {
    errors.push(`${fieldName} must not exceed ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateFileSize(file: File): ValidationResult {
  const errors: string[] = [];
  
  if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
    errors.push(ERROR_MESSAGES.FILE_TOO_LARGE);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateFileType(file: File): ValidationResult {
  const errors: string[] = [];
  
  if (!VALIDATION_RULES.ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    errors.push(ERROR_MESSAGES.INVALID_FILE_TYPE);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateSlug(slug: string): ValidationResult {
  const errors: string[] = [];
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  
  if (!slug) {
    errors.push('Slug is required');
  } else if (!slugRegex.test(slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUrl(url: string): ValidationResult {
  const errors: string[] = [];
  
  if (!url) {
    errors.push('URL is required');
  } else {
    try {
      new URL(url);
    } catch {
      errors.push('Please enter a valid URL');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Composite validation for forms
export function validatePost(data: {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
}): ValidationResult {
  const allErrors: string[] = [];
  
  const titleValidation = validateRequired(data.title, 'Title');
  if (!titleValidation.isValid) {
    allErrors.push(...titleValidation.errors);
  } else {
    const titleLengthValidation = validateStringLength(
      data.title,
      1,
      VALIDATION_RULES.MAX_TITLE_LENGTH,
      'Title'
    );
    if (!titleLengthValidation.isValid) {
      allErrors.push(...titleLengthValidation.errors);
    }
  }
  
  const contentValidation = validateRequired(data.content, 'Content');
  if (!contentValidation.isValid) {
    allErrors.push(...contentValidation.errors);
  } else {
    const contentLengthValidation = validateStringLength(
      data.content,
      1,
      VALIDATION_RULES.MAX_CONTENT_LENGTH,
      'Content'
    );
    if (!contentLengthValidation.isValid) {
      allErrors.push(...contentLengthValidation.errors);
    }
  }
  
  const slugValidation = validateSlug(data.slug);
  if (!slugValidation.isValid) {
    allErrors.push(...slugValidation.errors);
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

export function validateFAQ(data: {
  question: string;
  answer: string;
}): ValidationResult {
  const allErrors: string[] = [];
  
  const questionValidation = validateRequired(data.question, 'Question');
  if (!questionValidation.isValid) {
    allErrors.push(...questionValidation.errors);
  }
  
  const answerValidation = validateRequired(data.answer, 'Answer');
  if (!answerValidation.isValid) {
    allErrors.push(...answerValidation.errors);
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}