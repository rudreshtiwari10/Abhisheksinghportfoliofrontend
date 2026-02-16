import React, { useState } from 'react';
import './MessageForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4006';

const MessageForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    purpose: '',
    purposeDetail: '',
    organization: '',
    phone: '',
    message: '',
    consentGiven: false
  });

  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, attachment: 'Only PDF, DOC, and DOCX files are allowed' }));
        e.target.value = '';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, attachment: 'File size must be less than 5MB' }));
        e.target.value = '';
        return;
      }

      setAttachment(file);
      setErrors(prev => ({ ...prev, attachment: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.purpose) {
      newErrors.purpose = 'Please select a purpose';
    }

    if (formData.purpose === 'Other' && !formData.purposeDetail.trim()) {
      newErrors.purposeDetail = 'Please specify the purpose';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must consent to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {

      const submitData = new FormData();
      submitData.append('fullName', formData.fullName.trim());
      submitData.append('email', formData.email.trim());
      submitData.append('purpose', formData.purpose);
      submitData.append('purposeDetail', formData.purposeDetail.trim());
      submitData.append('organization', formData.organization.trim());
      submitData.append('phone', formData.phone.trim());
      submitData.append('message', formData.message.trim());
      submitData.append('consentGiven', formData.consentGiven);

      if (attachment) {
        submitData.append('attachment', attachment);
      }

      const response = await fetch(`${API_URL}/api/messages/submit`, {
        method: 'POST',
        body: submitData
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);

        setFormData({
          fullName: '',
          email: '',
          purpose: '',
          purposeDetail: '',
          organization: '',
          phone: '',
          message: '',
          consentGiven: false
        });
        setAttachment(null);

        const fileInput = document.getElementById('attachment');
        if (fileInput) fileInput.value = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else {
        setSubmitError(data.message || 'Failed to submit message. Please try again.');
      }

    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccess = () => {
    setSubmitSuccess(false);
  };

  return (
    <div className="message-form-container">
      {submitSuccess ? (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for reaching out. We will get back to you soon.</p>
          <button onClick={resetSuccess} className="btn-primary">
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Have a question or proposal? Get in touch with us.</p>
          </div>

          {submitError && (
            <div className="error-banner">
              <span>⚠️</span> {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="message-form">
                        <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

                        <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

                        <div className="form-group">
              <label htmlFor="organization">Organization / Company</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Company name (optional)"
              />
            </div>

                        <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900 (optional)"
              />
            </div>

                        <div className="form-group">
              <label htmlFor="purpose">
                Purpose of Contact <span className="required">*</span>
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={errors.purpose ? 'error' : ''}
              >
                <option value="">Select a purpose</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Partnership Proposal">Partnership Proposal</option>
                <option value="Consulting / Advisory Request">Consulting / Advisory Request</option>
                <option value="Speaking / Media Request">Speaking / Media Request</option>
                <option value="Other">Other</option>
              </select>
              {errors.purpose && <span className="error-text">{errors.purpose}</span>}
            </div>

                        {formData.purpose === 'Other' && (
              <div className="form-group">
                <label htmlFor="purposeDetail">
                  Please Specify <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="purposeDetail"
                  name="purposeDetail"
                  value={formData.purposeDetail}
                  onChange={handleChange}
                  placeholder="Briefly describe your purpose"
                  className={errors.purposeDetail ? 'error' : ''}
                />
                {errors.purposeDetail && <span className="error-text">{errors.purposeDetail}</span>}
              </div>
            )}

                        <div className="form-group">
              <label htmlFor="message">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Your message here..."
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

                        <div className="form-group">
              <label htmlFor="attachment">
                Attachment (Optional)
              </label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <small className="help-text">PDF, DOC, or DOCX (max 5MB)</small>
              {errors.attachment && <span className="error-text">{errors.attachment}</span>}
              {attachment && (
                <div className="file-info">
                  📎 {attachment.name} ({(attachment.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </div>

                        <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="consentGiven"
                  checked={formData.consentGiven}
                  onChange={handleChange}
                  className={errors.consentGiven ? 'error' : ''}
                />
                <span>
                  I consent to the storage and processing of my data for the purpose of responding to my inquiry. <span className="required">*</span>
                </span>
              </label>
              {errors.consentGiven && <span className="error-text">{errors.consentGiven}</span>}
            </div>

                        <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default MessageForm;
