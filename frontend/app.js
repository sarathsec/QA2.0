import React from "react";

const teamMembers = [
    { id: 1, name: "Bharath Marapaka", role: "QA Lead", experience: "2+ years" },
    { id: 2, name: "Priya Sharma", role: "Automation Tester", experience: "1.5 years" },
    { id: 3, name: "Rahul Verma", role: "Manual Tester", experience: "1 year" },
    { id: 4, name: "Aditi Nair", role: "API Tester", experience: "2 years" }
];

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">QA Team Members</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl shadow-md text-center">
                        <h2 className="text-xl font-semibold text-gray-700">{member.name}</h2>
                        <p className="text-gray-500">{member.role}</p>
                        <p className="text-gray-600 mt-2">Experience: {member.experience}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
