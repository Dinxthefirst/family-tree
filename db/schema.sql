CREATE TABLE animal (
  id         TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT,
  species    TEXT,
  photo      TEXT,
  about      TEXT
);

CREATE TABLE marriage (
  a TEXT NOT NULL REFERENCES animal(id),
  b TEXT NOT NULL REFERENCES animal(id),
  PRIMARY KEY (a, b),
  CHECK (a < b)
);

CREATE TABLE parent_child (
  parent_id TEXT NOT NULL REFERENCES animal(id),
  child_id  TEXT NOT NULL REFERENCES animal(id),
  PRIMARY KEY (parent_id, child_id),
  CHECK (parent_id <> child_id)
);

CREATE INDEX idx_pc_child ON parent_child(child_id);