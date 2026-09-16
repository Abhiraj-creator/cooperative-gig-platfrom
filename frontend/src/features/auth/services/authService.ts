import type { UserProfile, UserRole } from '../state/authSlice';

export const DEMO_CUSTOMER: UserProfile = {
  id: 'cust-101',
  name: 'Sarah Jenkins',
  email: 'sarah.customer@coopgig.org',
  role: 'customer',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  location: 'San Francisco, CA',
};

export const DEMO_WORKER: UserProfile = {
  id: 'wrk-502',
  name: 'Marcus Vance',
  email: 'marcus.worker@coopgig.org',
  role: 'worker',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  coopMemberId: 'COOP-8842-SF',
  skills: ['Master Electrician', 'Smart Home Wiring', 'Solar Installation'],
  hourlyRate: 48,
  location: 'Oakland, CA',
};

export interface LoginParams {
  email?: string;
  password?: string;
  role: UserRole;
}

export interface CustomerSignupParams {
  name: string;
  email: string;
  password?: string;
  location?: string;
}

export interface WorkerSignupParams {
  name: string;
  email: string;
  password?: string;
  skills: string[];
  coopMemberId?: string;
  hourlyRate?: number;
  location?: string;
}

export const authService = {
  loginWithCredentials: async (params: LoginParams): Promise<UserProfile> => {
    // Front-end mock: accepts any credentials without backend validation
    const emailName = params.email ? params.email.split('@')[0] : 'User';
    const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);

    if (params.role === 'worker') {
      return {
        id: `wrk-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formattedName || 'Co-op Worker',
        email: params.email || 'worker@coopgig.org',
        role: 'worker',
        coopMemberId: `COOP-${Math.floor(1000 + Math.random() * 9000)}-VAL`,
        skills: ['Electrical Services', 'Co-op Trade Specialist'],
        hourlyRate: 45,
        location: 'Bay Area, CA',
      };
    }

    return {
      id: `cust-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formattedName || 'Valued Customer',
      email: params.email || 'customer@coopgig.org',
      role: 'customer',
      location: 'San Francisco, CA',
    };
  },

  signupCustomer: async (params: CustomerSignupParams): Promise<UserProfile> => {
    return {
      id: `cust-${Math.floor(1000 + Math.random() * 9000)}`,
      name: params.name || 'New Customer',
      email: params.email,
      role: 'customer',
      location: params.location || 'San Francisco, CA',
    };
  },

  signupWorker: async (params: WorkerSignupParams): Promise<UserProfile> => {
    return {
      id: `wrk-${Math.floor(1000 + Math.random() * 9000)}`,
      name: params.name || 'New Co-op Worker',
      email: params.email,
      role: 'worker',
      coopMemberId: params.coopMemberId || `COOP-${Math.floor(1000 + Math.random() * 9000)}-MEMBER`,
      skills: params.skills.length > 0 ? params.skills : ['General Skilled Trade'],
      hourlyRate: params.hourlyRate || 40,
      location: params.location || 'Oakland, CA',
    };
  },
};
