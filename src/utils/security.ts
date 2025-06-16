
// Input validation and sanitization utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

export const validateFileSize = (size: number, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
};

export const rateLimiter = (() => {
  const attempts = new Map<string, { count: number; lastAttempt: number }>();
  
  return (identifier: string, maxAttempts: number = 5, windowMs: number = 300000): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier);
    
    if (!userAttempts) {
      attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    if (now - userAttempts.lastAttempt > windowMs) {
      attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    if (userAttempts.count >= maxAttempts) {
      return false;
    }
    
    userAttempts.count++;
    userAttempts.lastAttempt = now;
    return true;
  };
})();
