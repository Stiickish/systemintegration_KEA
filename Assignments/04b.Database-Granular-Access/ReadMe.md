Database Dokumentation

Denne ReadMe-fil indeholder dokumentation for databasen og dens struktur, samt information om brugere og rettigheder.

Database Navn
   • Systemintegration_kea
   • Connection string: systemintegration-kea.database.windows.net

Tabeller

1. read_table
      • Kolonner: ID (INT), Name (NVARCHAR (50)), AGE (INT)
      • Beskrivelse: Denne tabel indeholder data, som brugeren har læseadgang til.

2. read_write_table
      • Kolonner: ID (INT), Name (NVARCHAR (50)), AGE (INT)
      • Beskrivelse: Denne tabel indeholder data, som brugeren har læse- og skriveadgang til.

3. secret_table
      • Kolonner: ID (INT), Name (NVARCHAR (50))
      • Beskrivelse: Denne tabel indeholder fortrolige data, som kun udvalgte brugere har adgang til.

Brugere og Rettigheder
   • Bruger: frank
      • Beskrivelse: En bruger, der er oprettet til at få adgang til databasen. Brugeren har én eller flere tilladelser til databasen.
   • Login: frank
   • Adgangskode: @bcd1234
   • Rettigheder
      • Brugeren har forskellige tilladelser baseret på tabellerne:
      • Read_table: Læsetilladelse.
      • Read_write_table: Læse- og skrivetilladelse.
      • Secret_table: Tabellen er synlig, men brugeren har hverken læse- eller skrivetilladelse.

Tilslutning og Kommandoer
Databasen ”systemintegration_kea” kan tilgås på følgende måde:

1. Åben PowerShell eller hvilken som helst terminal

2. Hvis du har sqlcmd installeret, kan du køre følgende kommando for at oprette forbindelse.

      • sqlcmd -S <servernavn> -U <brugernavn> -P <adgangskode> -d <databasenavn>

      • Fordi adgangskoden har specielle karakterer, skal adgangskoden indkapsles med ' '.

3. Hvis forbindelsen succesfuld og der er oprettet forbindelse, vil der blive åbnet for en sql session (en form for shell). Denne kommando kan køres for at liste alle tilgængelige tabeller i databasen.

      • SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE'

      • Efter hvert sql statement skal man køre kommandoen ”go”.

4. Herefter kan almindelige sql kommandoer blive udført. Prøv diverse SELECT, INSERT statements for de forskellige tabeller.
