export const roles = {
  student: { label: 'Student', initials: 'AR', name: 'Aarav Rajan', email: 'aarav.rajan@campusconnect.edu', accent: 'violet' },
  faculty: { label: 'Faculty', initials: 'MK', name: 'Dr. Meera Krishnan', email: 'meera.krishnan@campusconnect.edu', accent: 'teal' },
  management: { label: 'Management', initials: 'PR', name: 'Priya Raman', email: 'priya.raman@campusconnect.edu', accent: 'gold' },
  company: { label: 'Company', initials: 'NV', name: 'Naveen Varma', email: 'naveen@northstar.io', accent: 'blue' },
  admin: { label: 'Admin', initials: 'AD', name: 'Admin Console', email: 'admin123@gmail.com', accent: 'red' },
}

export const dashboardData = {
  student: {
    eyebrow: 'Tuesday, 24 September 2026',
    title: 'Your next opportunity is closer than it looks.',
    description: 'Keep your profile sharp, stay close to your mentor, and let the right roles find you.',
    stats: [['Profile strength', '86%', '+12% this week', 'up'], ['Applications', '08', '2 need attention', 'warm'], ['Interview readiness', '74%', 'Good momentum', 'up']],
    focusLabel: 'Recommended for you',
    focusTitle: 'Frontend Engineer · Northstar Labs',
    focusMeta: 'Bengaluru · ₹12–16 LPA · Closes in 4 days',
  },
  faculty: {
    eyebrow: 'Mentor workspace · Tuesday, 24 September 2026',
    title: 'A clear view of your mentees, at a glance.',
    description: 'Track placement momentum, catch blockers early, and keep every student moving forward.',
    stats: [['Assigned mentees', '42', '6 need review', 'warm'], ['Placed this season', '18', '+4 this month', 'up'], ['Profile completion', '91%', 'Across your cohort', 'up']],
    focusLabel: 'Needs your attention',
    focusTitle: '6 students have incomplete profiles',
    focusMeta: 'B.Tech CSE · Final year · Review before Friday',
  },
  management: {
    eyebrow: 'Institution overview · Tuesday, 24 September 2026',
    title: 'Placement season, with nothing hidden.',
    description: 'One operating picture for faculty activity, student readiness, and hiring outcomes.',
    stats: [['Active students', '1,284', '+8.4% this term', 'up'], ['Placement rate', '78.6%', '+5.2% year on year', 'up'], ['Partner companies', '64', '12 active roles', 'warm']],
    focusLabel: 'Institution pulse',
    focusTitle: 'Your placement rate is up 5.2% this year',
    focusMeta: 'Computer Science leads at 84.1% · Updated 2h ago',
  },
  company: {
    eyebrow: 'Northstar Labs · Hiring workspace',
    title: 'Build the team that moves the future.',
    description: 'Find qualified campus talent with context, not noise. Your pipeline is moving.',
    stats: [['Open roles', '04', '2 closing this week', 'warm'], ['Applicants', '128', '+24 since Monday', 'up'], ['Shortlisted', '19', '8 interviews booked', 'up']],
    focusLabel: 'Active recruitment',
    focusTitle: 'Frontend Engineer · 46 applicants',
    focusMeta: '12 qualified by AI screening · Deadline 28 Sep',
  },
  admin: {
    eyebrow: 'Platform operations · Tuesday, 24 September 2026',
    title: 'The whole campus, in one operating picture.',
    description: 'Keep every institution, recruiter, and outcome connected as CampusConnect grows.',
    stats: [['Institutions', '24', '+3 this quarter', 'up'], ['Active users', '18,492', '+9.8% this month', 'up'], ['Live recruitments', '86', '14 closing soon', 'warm']],
    focusLabel: 'Platform health',
    focusTitle: '98.4% of placement workflows are healthy',
    focusMeta: '2 integrations need attention · Review operations queue',
  },
}

export const activity = [
  { icon: 'spark', title: 'Your profile was viewed by Northstar Labs', meta: '12 minutes ago', tone: 'violet' },
  { icon: 'check', title: 'Application moved to Under Review', meta: 'Yesterday · BlueOrbit Technologies', tone: 'teal' },
  { icon: 'message', title: 'Dr. Meera sent you a message', meta: 'Monday · “Let’s review your portfolio”', tone: 'gold' },
]

export const navByRole = {
  student: [['Overview', 'grid'], ['My profile', 'user'], ['Opportunities', 'briefcase'], ['Applications', 'file'], ['Messages', 'message']],
  faculty: [['Overview', 'grid'], ['My mentees', 'users'], ['Applications', 'file'], ['Messages', 'message'], ['Reports', 'chart']],
  management: [['Overview', 'grid'], ['Faculty', 'users'], ['Students', 'graduation'], ['Recruitment', 'briefcase'], ['Reports', 'chart']],
  company: [['Overview', 'grid'], ['Recruitments', 'briefcase'], ['Applicants', 'users'], ['Messages', 'message'], ['Company profile', 'building']],
  admin: [['Overview', 'grid'], ['Institutions', 'building'], ['Companies', 'briefcase'], ['User access', 'shield'], ['Analytics', 'chart']],
}
