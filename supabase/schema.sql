-- Run once in the Supabase SQL editor for the KFSSEC project.
create table if not exists public.site_content (
  key text primary key check (key in ('site', 'posts', 'masters', 'chatbot', 'courses')),
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
revoke all on public.site_content from anon, authenticated;

create or replace function public.touch_site_content_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at before update on public.site_content
for each row execute function public.touch_site_content_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 4194304, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 4194304,
allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp'];
