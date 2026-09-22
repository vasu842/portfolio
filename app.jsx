import React, { useState, useMemo, useEffect } from 'react';

// Data Definitions
const FACULTY_DATA = [
    { id: 'DMGT', name: 'Discrete Mathematics & Graph Theory', code: 'DMGT', teacher: 'Mrs. SaiGeetha', phone: '8297112259', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'UHV', name: 'Universal Human Values 2', code: 'UHV', teacher: 'Mrs. V. P. Rohini', phone: '8309508517', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { id: 'AI', name: 'Artificial Intelligence', code: 'AI', teacher: 'V. Janardhan Babu', phone: '9490000000', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'ADS', name: 'Advanced Data Structures & Algorithms', code: 'ADSA/ADS', teacher: 'Ms. H. Nazeema', phone: '8374946620', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'OOP', name: 'Object Oriented Programming Through Java', code: 'OOPJ/OOP', teacher: 'Mrs. N. Sridevi', phone: '9493324549', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'ADS_LAB', name: 'ADSA Lab', code: 'ADS LAB', teacher: 'Ms. H. Nazeema', phone: '8374946620', color: 'bg-purple-200 text-purple-900 border-purple-300' },
    { id: 'OOP_LAB', name: 'OOPJ Lab', code: 'OOP LAB', teacher: 'Mrs. N. Sridevi', phone: '9493324549', color: 'bg-amber-200 text-amber-900 border-amber-300' },
    { id: 'PP', name: 'Python Programming', code: 'PP', teacher: 'Mrs. K. Hemavathi', phone: '9347142967', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { id: 'PP_LAB', name: 'Python Programming Lab', code: 'PP LAB', teacher: 'Mrs. K. Hemavathi', phone: '9347142967', color: 'bg-teal-200 text-teal-900 border-teal-300' },
    { id: 'ES', name: 'Environmental Science', code: 'ES', teacher: 'Dr. P. Vinod Kumar', phone: '8500951282', color: 'bg-rose-100 text-rose-800 border-rose-200' },
];

const PERIODS = [
    { id: 'P1', label: 'Period 1', time: '09:30 AM - 10:20 AM' },
    { id: 'P2', label: 'Period 2', time: '10:20 AM - 11:10 AM' },
    { id: 'P3', label: 'Period 3', time: '11:10 AM - 12:00 PM' },
    { id: 'P4', label: 'Period 4', time: '12:50 PM - 01:40 PM' },
    { id: 'P5', label: 'Period 5', time: '01:40 PM - 02:30 PM' },
    { id: 'P6', label: 'Period 6', time: '02:30 PM - 03:20 PM' },
    { id: 'P7', label: 'Period 7', time: '03:20 PM - 04:10 PM' },
];

const TIMETABLE = {
    MON: [
        { subject: 'OOP1', code: 'OOP' },
        { subject: 'ADS1', code: 'ADS' },
        { subject: 'DMGT1', code: 'DMGT' },
        { subject: 'ADS2', code: 'ADS' },
        { subject: 'AI1', code: 'AI' },
        { subject: 'OOP2', code: 'OOP' },
        { subject: 'OOP3', code: 'OOP' }
    ],
    TUE: [
        { subject: 'AI2', code: 'AI' },
        { subject: 'ES1', code: 'ES' },
        { subject: 'DMGT2', code: 'DMGT' },
        { subject: 'PP LAB', code: 'PP_LAB', span: 4 },
        { subject: 'PP LAB', code: 'PP_LAB', isSpanChild: true },
        { subject: 'PP LAB', code: 'PP_LAB', isSpanChild: true },
        { subject: 'PP LAB', code: 'PP_LAB', isSpanChild: true }
    ],
    WED: [
        { subject: 'ADS3', code: 'ADS' },
        { subject: 'DMGT3', code: 'DMGT' },
        { subject: 'UHV1', code: 'UHV' },
        { subject: 'ADS4', code: 'ADS' },
        { subject: 'AI3', code: 'AI' },
        { subject: 'OOP4', code: 'OOP' },
        { subject: 'UHV3', code: 'UHV' }
    ],
    THU: [
        { subject: 'OOP LAB', code: 'OOP_LAB', span: 3 },
        { subject: 'OOP LAB', code: 'OOP_LAB', isSpanChild: true },
        { subject: 'OOP LAB', code: 'OOP_LAB', isSpanChild: true },
        { subject: 'OOP5', code: 'OOP' },
        { subject: 'DMGT4', code: 'DMGT' },
        { subject: 'ADS5', code: 'ADS' },
        { subject: 'PP', code: 'PP' }
    ],
    FRI: [
        { subject: 'UHV2', code: 'UHV' },
        { subject: 'ES2', code: 'ES' },
        { subject: 'DMGT5', code: 'DMGT' },
        { subject: 'AI4', code: 'AI' },
        { subject: 'ADS LAB', code: 'ADS_LAB', span: 3 },
        { subject: 'ADS LAB', code: 'ADS_LAB', isSpanChild: true },
        { subject: 'ADS LAB', code: 'ADS_LAB', isSpanChild: true }
    ]
};

// Generate 92 Students (88 regular + 4 lateral entry)
const GENERATE_STUDENTS = () => {
    const list = [];
    for (let i = 1; i <= 88; i++) {
        const num = i.toString().padStart(2, '0');
        list.push({
            roll: `25G01A43${num}`,
            name: `Student ${num}`,
            status: 'Present'
        });
    }
    for (let i = 1; i <= 4; i++) {
        list.push({
            roll: `25G01A43LE${i}`,
            name: `Lateral Entry Student ${i}`,
            status: 'Present'
        });
    }
    return list;
};

export default function App() {
    const [activeTab, setActiveTab] = useState('attendance');
    const [selectedDay, setSelectedDay] = useState('WED');
    const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(3);
    const [students, setStudents] = useState(GENERATE_STUDENTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState(null);

    const currentPeriodInfo = useMemo(() => {
        const daySchedule = TIMETABLE[selectedDay] || [];
        const slot = daySchedule[selectedPeriodIndex] || { subject: 'Free', code: 'NONE' };
        const faculty = FACULTY_DATA.find(f => f.id === slot.code) || {
            name: 'N/A',
            teacher: 'Unassigned',
            phone: 'N/A',
            color: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        const periodTime = PERIODS[selectedPeriodIndex] || { label: `P${selectedPeriodIndex + 1}`, time: 'N/A' };

        return {
            day: selectedDay,
            periodLabel: periodTime.label,
            time: periodTime.time,
            subjectTag: slot.subject,
            subjectName: faculty.name,
            teacher: faculty.teacher,
            phone: faculty.phone,
            color: faculty.color
        };
    }, [selectedDay, selectedPeriodIndex]);

    const handleStatusChange = (roll, newStatus) => {
        setStudents(prev => prev.map(s => s.roll === roll ? { ...s, status: newStatus } : s));
    };

    const handleAutoPresentAll = () => {
        setStudents(prev => prev.map(s => ({ ...s, status: 'Present' })));
        showToast('All 92 students set to PRESENT (Plan B)');
    };

    const handleSilentAbsentAll = () => {
        setStudents(prev => prev.map(s => ({ ...s, status: 'Absent' })));
        showToast('All 92 students set to ABSENT (Plan A)');
    };

    const handleSendSMSReport = () => {
        const absentees = students.filter(s => s.status === 'Absent');
        showToast(`SMS Dispatch trigger initialized for ${absentees.length} absentee(s).`);
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const filteredStudents = useMemo(() => {
        return students.filter(s =>
            s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [students, searchQuery]);

    const presentCount = students.filter(s => s.status === 'Present').length;
    const absentCount = students.filter(s => s.status === 'Absent').length;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-indigo-600 p-2 rounded-lg font-bold text-lg">AI</div>
                        <div>
                            <h1 className="text-lg font-bold leading-none">II B.Tech - I SEM (A-Sec)</h1>
                            <p className="text-xs text-slate-400 mt-1">Dept. of Artificial Intelligence</p>
                        </div>
                    </div>

                    <nav className="flex space-x-1 sm:space-x-2">
                        <button
                            onClick={() => setActiveTab('attendance')}
                            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                                activeTab === 'attendance'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            Take Attendance
                        </button>
                        <button
                            onClick={() => setActiveTab('timetable')}
                            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                                activeTab === 'timetable'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            Timetable
                        </button>
                        <button
                            onClick={() => setActiveTab('faculty')}
                            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                                activeTab === 'faculty'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            Faculty Directory
                        </button>
                    </nav>
                </div>
            </header>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-4 right-4 z-50 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 border border-slate-700 animate-bounce">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Main Container */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                
                {/* TAB 1: ATTENDANCE */}
                {activeTab === 'attendance' && (
                    <div className="space-y-6">
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Select Day</label>
                                    <select
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="MON">Monday</option>
                                        <option value="TUE">Tuesday</option>
                                        <option value="WED">Wednesday</option>
                                        <option value="THU">Thursday</option>
                                        <option value="FRI">Friday</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Select Period</label>
                                    <select
                                        value={selectedPeriodIndex}
                                        onChange={(e) => setSelectedPeriodIndex(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {PERIODS.map((p, idx) => (
                                            <option key={p.id} value={idx}>
                                                {p.label} ({p.time})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-2 flex items-center">
                                    <div className={`w-full p-3 rounded-xl border flex items-center justify-between ${currentPeriodInfo.color}`}>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-bold text-sm tracking-wide">{currentPeriodInfo.subjectTag}</span>
                                                <span className="text-xs opacity-75">({currentPeriodInfo.time})</span>
                                            </div>
                                            <p className="text-xs font-medium mt-0.5">{currentPeriodInfo.subjectName}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold block">{currentPeriodInfo.teacher}</span>
                                            <span className="text-[11px] opacity-80">{currentPeriodInfo.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-4 w-full md:w-auto">
                                <div className="bg-slate-100 px-4 py-2 rounded-xl text-center flex-1 md:flex-none">
                                    <span className="text-xs text-slate-500 block font-medium">Total</span>
                                    <span className="text-lg font-bold text-slate-800">{students.length}</span>
                                </div>
                                <div className="bg-emerald-50 px-4 py-2 rounded-xl text-center flex-1 md:flex-none border border-emerald-100">
                                    <span className="text-xs text-emerald-600 block font-medium">Present</span>
                                    <span className="text-lg font-bold text-emerald-700">{presentCount}</span>
                                </div>
                                <div className="bg-rose-50 px-4 py-2 rounded-xl text-center flex-1 md:flex-none border border-rose-100">
                                    <span className="text-xs text-rose-600 block font-medium">Absent</span>
                                    <span className="text-lg font-bold text-rose-700">{absentCount}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                                <button
                                    onClick={handleAutoPresentAll}
                                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                                >
                                    Plan B: Auto Present All
                                </button>
                                <button
                                    onClick={handleSilentAbsentAll}
                                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                                >
                                    Plan A: Mark All Absent
                                </button>
                                <button
                                    onClick={handleSendSMSReport}
                                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                                >
                                    Send Standard Absent SMS
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
                                <div className="relative flex-1 max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Search roll no or name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Showing {filteredStudents.length} Students</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                                            <th className="py-3.5 px-6">#</th>
                                            <th className="py-3.5 px-6">Roll Number</th>
                                            <th className="py-3.5 px-6">Student Name</th>
                                            <th className="py-3.5 px-6 text-center">Attendance Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredStudents.map((s, idx) => (
                                            <tr key={s.roll} className="hover:bg-slate-50/80 transition">
                                                <td className="py-3 px-6 text-slate-400 text-xs">{idx + 1}</td>
                                                <td className="py-3 px-6 font-semibold text-slate-800">{s.roll}</td>
                                                <td className="py-3 px-6 font-medium text-slate-600">{s.name}</td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
                                                        <button
                                                            onClick={() => handleStatusChange(s.roll, 'Present')}
                                                            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                                                                s.status === 'Present'
                                                                    ? 'bg-emerald-600 text-white shadow-sm'
                                                                    : 'text-slate-600 hover:text-slate-900'
                                                            }`}
                                                        >
                                                            Present
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(s.roll, 'Absent')}
                                                            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                                                                s.status === 'Absent'
                                                                    ? 'bg-rose-600 text-white shadow-sm'
                                                                    : 'text-slate-600 hover:text-slate-900'
                                                            }`}
                                                        >
                                                            Absent
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredStudents.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="py-8 text-center text-slate-400 text-sm">
                                                    No students found matching your query.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: TIMETABLE */}
                {activeTab === 'timetable' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-slate-100 gap-2">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Weekly Master Timetable</h2>
                                    <p className="text-xs text-slate-500 mt-1">Periods skip cleanly from Period 3 to Period 4 without Lunch column interruptions.</p>
                                </div>
                                <div className="flex items-center space-x-2 text-xs">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                                    <span className="text-slate-600">Morning (P1-P3)</span>
                                    <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block ml-3"></span>
                                    <span className="text-slate-600">Afternoon (P4-P7)</span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-center border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                                            <th className="p-3 border border-slate-200 w-24">Day</th>
                                            {PERIODS.map(p => (
                                                <th key={p.id} className="p-3 border border-slate-200">
                                                    <div className="font-bold">{p.label}</div>
                                                    <div className="text-[10px] font-normal text-slate-500 mt-0.5">{p.time}</div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-medium">
                                        {Object.keys(TIMETABLE).map(day => {
                                            const slots = TIMETABLE[day];
                                            return (
                                                <tr key={day} className="hover:bg-slate-50">
                                                    <td className="p-3 border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs">
                                                        {day}
                                                    </td>
                                                    {slots.map((slot, pIdx) => {
                                                        if (slot.isSpanChild) return null;

                                                        const faculty = FACULTY_DATA.find(f => f.id === slot.code) || {};
                                                        return (
                                                            <td
                                                                key={pIdx}
                                                                colSpan={slot.span || 1}
                                                                className={`p-3 border border-slate-200 text-xs ${faculty.color || 'bg-white'} hover:brightness-95 transition cursor-pointer`}
                                                                onClick={() => {
                                                                    setSelectedDay(day);
                                                                    setSelectedPeriodIndex(pIdx);
                                                                    setActiveTab('attendance');
                                                                }}
                                                                title="Click to select this session in Attendance mode"
                                                            >
                                                                <div className="font-bold">{slot.subject}</div>
                                                                <div className="text-[10px] opacity-80 mt-1">{faculty.teacher || ''}</div>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: FACULTY DIRECTORY */}
                {activeTab === 'faculty' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Faculty Directory</h2>
                                <p className="text-xs text-slate-500 mt-1">Department of AI - II B.Tech I SEM Course Handlers</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {FACULTY_DATA.map((fac) => (
                                <div key={fac.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${fac.color}`}>
                                                {fac.code}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-base">{fac.name}</h3>
                                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-slate-500">Faculty:</span>
                                                <span className="font-medium text-slate-800">{fac.teacher}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-slate-500">Contact:</span>
                                                <a href={`tel:${fac.phone}`} className="text-indigo-600 hover:underline font-medium">{fac.phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
                    Department of Artificial Intelligence • II B.Tech - I SEM A-Section Attendance Portal
                </div>
            </footer>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { initialStudents, teachers, timetable, periodTimes } from './initialData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedDay, setSelectedDay] = useState('MON');
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Attendance stored per day and period slot
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem('ai_period_attendance_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    
    // Default initial state for all days and 7 periods
    const initial = {};
    Object.keys(timetable).forEach(day => {
      initial[day] = {};
      for (let i = 0; i < 7; i++) {
        initial[day][i] = initialStudents.map(s => ({ ...s }));
      }
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('ai_period_attendance_data', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Active period subject code & details
  const currentSubjectCode = timetable[selectedDay]?.[selectedPeriodIndex] || "N/A";
  const getTeacherForCode = (code) => {
    if (code.includes("DMGT")) return teachers[0];
    if (code.includes("UHV")) return teachers[1];
    if (code.includes("AI")) return teachers[2];
    if (code.includes("ADS LAB")) return teachers[5];
    if (code.includes("ADS")) return teachers[3];
    if (code.includes("OOP LAB")) return teachers[6];
    if (code.includes("OOP")) return teachers[4];
    if (code.includes("PP")) return teachers[7];
    if (code.includes("ES")) return teachers[8];
    return { teacher: "Faculty", subName: code };
  };

  const currentTeacher = getTeacherForCode(currentSubjectCode);
  const currentStudents = attendanceRecords[selectedDay]?.[selectedPeriodIndex] || initialStudents;

  const handleAction = (rollNo, action) => {
    setAttendanceRecords(prev => {
      const updatedDay = { ...prev[selectedDay] };
      const updatedPeriod = updatedDay[selectedPeriodIndex].map(student => {
        if (student.rollNo !== rollNo) return student;
        if (action === 'plan_a') return { ...student, status: 'Absent', notifyParent: false };
        if (action === 'plan_b') return { ...student, status: 'Present', notifyParent: true };
        if (action === 'standard') return { ...student, status: 'Absent', notifyParent: true };
        return student;
      });
      updatedDay[selectedPeriodIndex] = updatedPeriod;
      return { ...prev, [selectedDay]: updatedDay };
    });
  };

  const setAllStatus = (status) => {
    setAttendanceRecords(prev => {
      const updatedDay = { ...prev[selectedDay] };
      updatedDay[selectedPeriodIndex] = updatedDay[selectedPeriodIndex].map(s => ({
        ...s,
        status: status,
        notifyParent: status === 'Present' ? true : s.notifyParent
      }));
      return { ...prev, [selectedDay]: updatedDay };
    });
  };

  const filteredStudents = currentStudents.filter(
    s => s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="portal-container">
      <div className="header">
        <h1 className="header-title">College Attendance & Timetable Portal</h1>
        <p className="header-sub">
          Department of Artificial Intelligence (AI) — II B.Tech I SEM (A-Section) LH 203
        </p>
      </div>

      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
          Mark Attendance
        </button>
        <button className={`tab-btn ${activeTab === 'timetable' ? 'active' : ''}`} onClick={() => setActiveTab('timetable')}>
          Class Timetable
        </button>
        <button className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
          Faculty Directory
        </button>
      </div>

      {activeTab === 'attendance' && (
        <div>
          <div className="selector-card">
            <div className="control-group">
              <div>
                <label className="select-label">Select Day:</label>
                <select className="custom-select" value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
                  {Object.keys(timetable).map(day => <option key={day} value={day}>{day}</option>)}
                </select>
              </div>

              <div>
                <label className="select-label">Select Period:</label>
                <select className="custom-select" value={selectedPeriodIndex} onChange={e => setSelectedPeriodIndex(Number(e.target.value))}>
                  {periodTimes.map((time, idx) => (
                    <option key={idx} value={idx}>
                      Period {idx + 1} ({time})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flexGrow: 1 }}>
                <label className="select-label">Search Student:</label>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Roll No or Student Name..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ alignSelf: 'flex-end', display: 'flex', gap: '8px' }}>
                <button className="btn-secondary" onClick={() => setAllStatus('Present')}>Mark All Present</button>
                <button className="btn-secondary" onClick={() => setAllStatus('Absent')}>Mark All Absent</button>
              </div>
            </div>

            <div className="active-period-info">
              <strong>Period {selectedPeriodIndex + 1}:</strong> {currentSubjectCode} — {currentTeacher.subName || 'Subject'} | 
              <strong> Teacher:</strong> {currentTeacher.teacher} ({currentTeacher.phone})
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Dept</th>
                <th>Status</th>
                <th>Parent Alert</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.rollNo}>
                  <td><strong>{student.rollNo}</strong></td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>
                    <span className={`badge ${student.status === 'Present' ? 'badge-present' : 'badge-absent'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    {student.status === 'Absent' ? (
                      student.notifyParent ? (
                        <span className="badge badge-sent">SMS Sent</span>
                      ) : (
                        <span className="badge badge-suppressed">Plan A: Suppressed</span>
                      )
                    ) : (
                      <span style={{ color: '#94a3b8' }}>—</span>
                    )}
                  </td>
                  <td>
                    <select
                      className="action-dropdown"
                      value={student.status === 'Present' ? 'plan_b' : student.notifyParent ? 'standard' : 'plan_a'}
                      onChange={(e) => handleAction(student.rollNo, e.target.value)}
                    >
                      <option value="plan_b">Plan B: Auto Present</option>
                      <option value="plan_a">Plan A: Silent Absent</option>
                      <option value="standard">Standard Absent (SMS)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'timetable' && (
        <div style={{ marginTop: '20px' }}>
          <table className="data-table timetable-table">
            <thead>
              <tr>
                <th>DAY</th>
                {periodTimes.map((time, idx) => (
                  <th key={idx}>Period {idx + 1}<br/>({time})</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(timetable).map(day => (
                <tr key={day}>
                  <td><strong>{day}</strong></td>
                  {timetable[day].map((code, idx) => {
                    const isSelected = selectedDay === day && selectedPeriodIndex === idx;
                    const teacherInfo = getTeacherForCode(code);
                    return (
                      <td key={idx} className={isSelected ? 'active-slot' : ''}>
                        <div className="slot-code">{code}</div>
                        <div className="slot-teacher">{teacherInfo.teacher}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'teachers' && (
        <div className="grid-cards">
          {teachers.map((item, idx) => (
            <div className="faculty-card" key={idx}>
              <div className="faculty-name">{item.teacher}</div>
              <div className="faculty-subject">{item.subName}</div>
              <div className="faculty-phone">📞 Code: {item.subCode} | Mobile: {item.phone}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}