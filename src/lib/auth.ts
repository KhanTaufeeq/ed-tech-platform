import { useAuth } from '../context/AuthContext';
import { useEffect, useState} from 'react';

// Define the enrollment interface to avoid using 'any'
interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  role: string;
}

// Create a helper function to get enrollments without hooks
const getEnrollmentsFromStorage = (): Enrollment[] => {
  if (typeof window !== 'undefined') {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    return JSON.parse(localStorage.getItem('enrollments') || '[]');
  }
  return [];
};

// Function version that doesn't use hooks
export const getUserRoleWithUser = (userId: string, courseId: string): string | null => {
  const enrollments = getEnrollmentsFromStorage();
  const enrollment = enrollments.find(
    (e: Enrollment) => e.userId === userId && e.courseId === courseId
  );
  
  return enrollment ? enrollment.role : null;
};

// Hook version that can be used in React components
// export const useGetUserRole = (courseId: string): string | null => {
//   const { user } = useAuth();
//   if (!user || !user.id) return null;
  
//   return getUserRoleWithUser(user.id, courseId);
// };

export const useGetUserRole = (courseId?: string): string | null => {
  const { user } = useAuth()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id || !courseId) return

    const fetchRole = async () => {
      const fetchedRole = await getUserRoleWithUser(user.id, courseId)
      setRole(fetchedRole)
    }

    fetchRole()
  }, [user?.id, courseId])

  return role
}

// Function version that doesn't use hooks
export const checkIsEnrolledWithUser = (userId: string, courseId: string): boolean => {
  const enrollments = getEnrollmentsFromStorage();
  return enrollments.some(
    (e: Enrollment) => e.userId === userId && e.courseId === courseId
  );
};

// Hook version that can be used in React components
export const useCheckIsEnrolled = (courseId: string): boolean => {
  const { user } = useAuth();
  if (!user || !user.id) return false;
  
  return checkIsEnrolledWithUser(user.id, courseId);
};

// Function version that doesn't use hooks
export const enrollInCourseWithUser = (userId: string, courseId: string, role = 'Student'): boolean => {
  if (!userId) return false;
  
  const enrollments = getEnrollmentsFromStorage();
  
  // Check if already enrolled
  if (enrollments.some((e: Enrollment) => e.userId === userId && e.courseId === courseId)) {
    return false;
  }
  
  // Add new enrollment
  enrollments.push({
    id: Date.now().toString(),
    userId,
    courseId,
    role
  });
  
  localStorage.setItem('enrollments', JSON.stringify(enrollments));
  return true;
};

// Hook version that can be used in React components
export const useEnrollInCourse = () => {
  const { user } = useAuth();
  
  return (courseId: string, role = 'Student'): boolean => {
    if (!user || !user.id) return false;
    return enrollInCourseWithUser(user.id, courseId, role);
  };
};

// For backward compatibility - these will need to be updated in components
export const getUserRole = useGetUserRole;
export const checkIsEnrolled = useCheckIsEnrolled;
export const enrollInCourse = useEnrollInCourse;
