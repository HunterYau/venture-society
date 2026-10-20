CREATE TABLE IF NOT EXISTS registrations (
  id serial PRIMARY KEY,
  full_name varchar(80) NOT NULL,
  school_id varchar(12) NOT NULL,
  school_email varchar(120) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_school_id
  ON registrations (school_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_school_email
  ON registrations (school_email);
