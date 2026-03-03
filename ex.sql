CREATE TABLE public.mesures (
  id bigint NOT NULL DEFAULT nextval('mesures_id_seq'::regclass),
  humidite integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT mesures_pkey PRIMARY KEY (id)
);
CREATE TABLE public.mesures_temperature (
  temperature numeric NOT NULL,
  commentaire text
);
CREATE TABLE public.utilisateurs (
  id integer NOT NULL DEFAULT nextval('utilisateurs_id_seq'::regclass),
  nom_utilisateur text NOT NULL UNIQUE,
  mot_de_passe text NOT NULL,
  CONSTRAINT utilisateurs_pkey PRIMARY KEY (id)
);