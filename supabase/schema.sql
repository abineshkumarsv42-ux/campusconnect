-- CampusConnect foundation schema. Apply through Supabase SQL editor.
create type public.app_role as enum ('admin', 'management', 'faculty', 'student', 'company');
create type public.account_status as enum ('active', 'inactive', 'pending');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null,
  name text not null,
  email text not null unique,
  status public.account_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.management (
  id uuid primary key references public.profiles(id) on delete cascade,
  institution_name text not null,
  management_code text unique not null
);

create table public.faculty (
  id uuid primary key references public.profiles(id) on delete cascade,
  management_id uuid not null references public.management(id),
  faculty_code text unique not null,
  department text not null
);

create table public.students (
  id uuid primary key references public.profiles(id) on delete cascade,
  mentor_id uuid references public.faculty(id),
  register_number text unique not null,
  phone text,
  department text not null,
  course text not null,
  graduation_year int,
  semester int,
  cgpa numeric(4,2),
  skills text[] not null default '{}',
  profile_status text not null default 'incomplete'
);

create table public.companies (
  id uuid primary key references public.profiles(id) on delete cascade,
  company_code text unique not null,
  website text,
  industry text
);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  description text not null,
  required_skills text[] not null default '{}',
  eligible_departments text[] not null default '{}',
  eligible_year int[],
  minimum_cgpa numeric(4,2),
  salary text,
  location text,
  job_type text,
  application_deadline date not null,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id),
  job_id uuid not null references public.jobs(id),
  resume_id uuid references public.resumes(id),
  status text not null default 'Applied',
  match_score numeric(5,2),
  matching_skills text[] not null default '{}',
  missing_skills text[] not null default '{}',
  eligibility_result text,
  ai_explanation text,
  created_at timestamptz not null default now(),
  unique(student_id, job_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table public.conversation_members (
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  last_read_at timestamptz,
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);

create index applications_job_id_idx on public.applications(job_id);
create index applications_student_id_idx on public.applications(student_id);
create index notifications_user_id_idx on public.notifications(user_id, created_at desc);
create index messages_conversation_id_idx on public.messages(conversation_id, created_at);

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.faculty enable row level security;
alter table public.management enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.notifications enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;

create or replace function public.current_role() returns public.app_role language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;

create policy "profiles own record" on public.profiles for select using (id = auth.uid());
create policy "students own record or mentor" on public.students for select using (id = auth.uid() or mentor_id = auth.uid());
create policy "faculty own record" on public.faculty for select using (id = auth.uid());
create policy "active jobs are readable" on public.jobs for select using (status = 'published' or company_id = auth.uid());
create policy "students manage own applications" on public.applications for all using (student_id = auth.uid());
create policy "companies view own applicants" on public.applications for select using (exists (select 1 from public.jobs where jobs.id = applications.job_id and jobs.company_id = auth.uid()));
create policy "users read own notifications" on public.notifications for select using (user_id = auth.uid());
create policy "conversation members read" on public.conversation_members for select using (user_id = auth.uid());
create policy "members read messages" on public.messages for select using (exists (select 1 from public.conversation_members where conversation_id = messages.conversation_id and user_id = auth.uid()));
