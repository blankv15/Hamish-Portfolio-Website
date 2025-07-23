import React, { useState } from 'react';
import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Container,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconAt, IconMessageCircle, IconMapPin, IconLanguage, IconLicense, IconCheck, IconX } from '@tabler/icons-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import './ContactSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (!/^\S+@\S+$/.test(value) ? 'Invalid email' : null),
      message: (value) => (value.trim().length === 0 ? 'Message cannot be empty' : null),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setFormStatus(null);

    if (!executeRecaptcha) {
      setFormStatus({ status: 'error', message: 'reCAPTCHA not ready. Please try again.' });
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_form');
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred on the server.');
      }
      
      setFormStatus({ status: 'success', message: 'Message sent! Thank you for reaching out.' });
      form.reset();

    } catch (error) {
      setFormStatus({ status: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnother = () => {
    setFormStatus(null);
  };

  return (
      <div className="contact-card">
        {/* Left Column: Contact Info */}
        <div className="contact-info">
          <Title order={2} className="contact-title">Get in touch</Title>
          <Text className="contact-subtitle">
            Have a project, a question, or just want to connect? Fill out the form, and I’ll get back to you as soon as possible.
          </Text>
          <div className="contact-details">
            <Group wrap="nowrap" gap="xl" mt="xl">
              <IconMapPin stroke={1.5} size="1.5rem" className="contact-icon" />
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">Location</Text>
                <Text size="lg" fw={500}>Auckland, New Zealand</Text>
              </div>
            </Group>
            <Group wrap="nowrap" gap="xl" mt="xl">
              <IconLanguage stroke={1.5} size="1.5rem" className="contact-icon" />
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">Languages</Text>
                <Text size="lg" fw={500}>English</Text>
              </div>
            </Group>
            <Group wrap="nowrap" gap="xl" mt="xl">
              <IconLicense stroke={1.5} size="1.5rem" className="contact-icon" />
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">Licence</Text>
                <Text size="lg" fw={500}>Full NZ Driver's Licence</Text>
              </div>
            </Group>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form-container">
          {formStatus?.status === 'success' ? (
            <div className="form-status-message success">
              <IconCheck size={48} stroke={1.5} />
              <Title order={3} mt="md">Message Sent!</Title>
              <Text mt="sm">{formStatus.message}</Text>
              <Button 
                mt="xl" 
                onClick={handleSendAnother}
                bg="var(--accent-orange)"
                styles={{ root: { '&:hover': { backgroundColor: 'var(--accent-orange-hover)' } } }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput required label="Your Name" placeholder="John Doe" leftSection={<IconUser size={16} />} {...form.getInputProps('name')} />
              <TextInput required mt="md" label="Your Email" placeholder="your@email.com" leftSection={<IconAt size={16} />} {...form.getInputProps('email')} />
              <Textarea required mt="md" label="Your Message" placeholder="I'd like to talk about..." minRows={4} leftSection={<IconMessageCircle size={16} />} {...form.getInputProps('message')} />
              
              {formStatus?.status === 'error' && (
                <Text c="red" size="sm" mt="sm" className="form-status-message error">
                  <IconX size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  {formStatus.message}
                </Text>
              )}
              
              <Group justify="flex-end" mt="md">
                <Button 
                  type="submit" 
                  loading={loading}
                  bg="var(--accent-orange)"
                  styles={{ root: { '&:hover': { backgroundColor: 'var(--accent-orange-hover)' } } }}
                >
                  Send Message
                </Button>
              </Group>
            </form>
          )}
        </div>
      </div>
  );
}

export default ContactSection;
