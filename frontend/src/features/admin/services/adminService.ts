import type { AdminQueueSummary } from '../types';

export async function fetchAdminQueues(): Promise<AdminQueueSummary[]> {
  return [
    { id: 'verification', label: 'Verification', count: 18 },
    { id: 'workforce', label: 'Workforce', count: 7 },
    { id: 'disputes', label: 'Disputes', count: 3 },
  ];
}

export async function fetchPendingWorkers() {
  return [
    { id: 'wrk-101', name: 'Ramesh Kumar', location: 'Noida', isApproved: false, skills: ['Electrical', 'Plumbing'], rate: 500, phone: '9876543210', photo: '/images/photos/image1.jpg' },
    { id: 'wrk-102', name: 'Suresh Raina', location: 'Mumbai', isApproved: false, skills: ['Carpentry'], rate: 450, phone: '9876543211', photo: '/images/photos/image2.jpg' },
    { id: 'wrk-103', name: 'Amit Singh', location: 'Pune', isApproved: true, skills: ['Solar Installation'], rate: 800, phone: '9876543212', photo: '/images/photos/image3.jpg' },
  ];
}
