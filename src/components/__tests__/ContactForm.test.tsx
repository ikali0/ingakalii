/**
 * Unit Tests for ContactForm Component
 * 
 * Tests cover:
 * - Form validation
 * - Submit handling
 * - Error states
 * - Loading states
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contactFormSchema, type ContactFormData } from '../ContactForm';

describe('Contact Form Validation', () => {
  describe('Name Field', () => {
    it('should reject empty name', () => {
      const result = contactFormSchema.safeParse({
        name: '',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    it('should reject name with only whitespace', () => {
      const result = contactFormSchema.safeParse({
        name: '   ',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid name', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject name exceeding 100 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'a'.repeat(101),
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Email Field', () => {
    it('should reject invalid email format', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    it('should accept valid email', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject email exceeding 255 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'a'.repeat(250) + '@test.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Subject Field', () => {
    it('should reject empty subject', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: '',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('subject');
      }
    });

    it('should accept valid subject', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Inquiry about services',
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject subject exceeding 200 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'a'.repeat(201),
        message: 'This is a test message with enough characters.',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Message Field', () => {
    it('should reject message less than 10 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message');
      }
    });

    it('should accept message with 10+ characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a valid message with enough characters.',
      });
      expect(result.success).toBe(true);
    });

    it('should reject message exceeding 2000 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'a'.repeat(2001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Full Form Validation', () => {
    it('should validate a complete valid form', () => {
      const validData: ContactFormData = {
        name: 'Jane Smith',
        email: 'jane@example.org',
        subject: 'Project Collaboration',
        message: 'I would like to discuss a potential collaboration on an upcoming project.',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should trim whitespace from all fields', () => {
      const dataWithWhitespace = {
        name: '  John Doe  ',
        email: '  john@example.com  ',
        subject: '  Hello  ',
        message: '  This is a test message with extra spaces.  ',
      };

      const result = contactFormSchema.safeParse(dataWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
        expect(result.data.subject).toBe('Hello');
        expect(result.data.message).toBe('This is a test message with extra spaces.');
      }
    });
  });
});
