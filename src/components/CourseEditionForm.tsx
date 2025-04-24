import { useState, FormEvent } from 'react'
import { Course, CourseLevel } from '../types'

interface CourseEditFormProps {
    course: Course
    onSubmit: (courseData: { title: string, description: string, level: string }) => void
    isSubmitting: boolean
}

export default function CourseEditForm({ course, onSubmit, isSubmitting }: CourseEditFormProps) {
    const [title, setTitle] = useState(course.title)
    const [description, setDescription] = useState(course.description)
    const [level, setLevel] = useState(course.level)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({ title, description, level })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2">Course Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    required
                ></textarea>
            </div>

            <div className="mb-6">
                <label htmlFor="level" className="block text-gray-700 mb-2">Level</label>
                <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as CourseLevel)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value={CourseLevel.Beginner}>Beginner</option>
                    <option value={CourseLevel.Intermediate}>Intermediate</option>
                    <option value={CourseLevel.Advanced}>Advanced</option>
                </select>
            </div>

            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>

                <a
                    href={`/courses/${course.id}`}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-center"
                >
                    Cancel
                </a>
            </div>
        </form>
    )
}
