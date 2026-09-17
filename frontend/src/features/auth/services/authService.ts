import type { UserProfile, UserRole } from '../state/authSlice';

export const DEMO_CUSTOMER: UserProfile = {
  id: 'cust-101',
  name: 'Rahul Sharma',
  email: 'rahul.customer@coopgig.org',
  role: 'customer',
  avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  location: 'Mumbai, MH',
};

export const DEMO_ADMIN: UserProfile = {
  id: 'admin-001',
  name: 'Demo Admin',
  email: 'admin@coopgig.org',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
  location: 'Headquarters',
  isApproved: true,
};

export const DEMO_WORKER: UserProfile = {
  id: 'wrk-502',
  name: 'Rajesh Kumar',
  email: 'rajesh.worker@coopgig.org',
  role: 'worker',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  coopMemberId: 'COOP-8842-IN',
  skills: ['Master Electrician', 'Smart Home Wiring', 'Solar Installation'],
  hourlyRate: 48,
  location: 'Pune, MH',
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

    if (params.role === 'admin') {
      return {
        id: `admin-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formattedName || 'System Admin',
        email: params.email || 'admin@coopgig.org',
        role: 'admin',
        location: 'Headquarters',
        isApproved: true,
      };
    }

    if (params.role === 'worker') {
      return {
        id: `wrk-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formattedName || 'Co-op Worker',
        email: params.email || 'worker@coopgig.org',
        role: 'worker',
        coopMemberId: `COOP-${Math.floor(1000 + Math.random() * 9000)}-VAL`,
        skills: ['Electrical Services', 'Co-op Trade Specialist'],
        hourlyRate: 45,
        location: 'Bengaluru, KA',
      };
    }

    return {
      id: `cust-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formattedName || 'Valued Customer',
      email: params.email || 'customer@coopgig.org',
      role: 'customer',
      location: 'Mumbai, MH',
    };
  },

  signupCustomer: async (params: CustomerSignupParams): Promise<UserProfile> => {
    return {
      id: `cust-${Math.floor(1000 + Math.random() * 9000)}`,
      name: params.name || 'New Customer',
      email: params.email,
      role: 'customer',
      location: params.location || 'Mumbai, MH',
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
      location: params.location || 'Pune, MH',
      isApproved: false,
    }
  },
};
