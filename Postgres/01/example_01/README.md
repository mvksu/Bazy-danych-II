# Pierwszy „kontakt” Node.js -> PostgreSQL

Żeby uruchomić zawarty w tym repozytorium prosty przykład należy:

1. Stworzyć plik `.env` o zawartości:

```
PGUSER=postgres
PGHOST=127.0.0.1
PGPASSWORD=tajne
```

2. Upewnić się, że kontener z PostgreSQL działa – używając np. polecenia:

```
docker ps
```

3. Zainstalować zależności:

```
npm install
```

4. Wywołać „skrypt przykładowy”:

```
node index.js
```

W efekcie powinien pojawić się napis:

```
Hello world!
```

Jeśli zamiast tego pojawi się napis

```
Nie mogę połączyć się z serwerem
```

trzeba starannie zweryfikować wszystkie kroki opisane w plik typu Markdown dołączonym do wykładu 1.

Powodzenia!
