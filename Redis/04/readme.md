# Redis

Napisany w ANSI C „serwer struktur danych”

Główne zastosowania

- pamięć podręczna (cache) aplikacji
- elastyczne struktury danych
- broker wiadomości

### Uwagi

- wszystkie danych przechowywane w pamieci RAM (sic!)
- możliwe (automatyczne) tworzenie „kopii zapasowych” na dysku
- często wykozrzystywany _razem_ z „prawdziwą bazą dancy” – aby zwiekszyć wydajność (aplikacji)

### Dane przechowywane w kombinacjach klucz-wartość

Cechy

- __klucz__ – „referencja” do zapmietanej wartości
- „napisy” to ciągi bajtów, klucz (jako ciąg bajtów) może mieć maksymalną wielkość 512MB

## Utrwalanie danych

Dostępne są dwa formaty

### Redis Database (RDB)

Zalety

- kompaktowy zapis (pojedynczy plik),
- obrazuje stan danych „w momencie ostatniego tworzenia obrazu”
- bardzo dobre rozwiązaniem do kopii zapasowych
- możemy sterować wydajnościa/częstotliwością (osobny proces zapisujące dane)
- szybszy niż w przypadku alternatywnym restart

Problemy/wady

- ciągle istnieje niebezpieczeństwo utraty (części) danych
- wpływ procesu zapisującego na wydajność

### Append Only File (AOF)

Zalety

- różne wydajne „polityki zapisu” (np. „co sekundę” wciąż daje bardzo dobrą wydajność)
- duże bezpieczeństwo dzięki wykorzystywaniu wyłącznie „dopisywania”
- wydajne i bezpieczne „przełączanie” na kolejny plik AOF

Problemy/wady

- pliki typu AOF mogą być duże
- nieco wolniejsze tworzenie niż w przypadku RDB (zapisywana jest każda operacja)
- w przypadku (naprawionych pomiędzy wersjami) błędów w interpretacji operacji „odtworzenie” listy operacji może dać inny stan bazy niż „rzeczywisty”

__Uwaga!__ Formaty utrwalania można ze zobą łączyć – AOF + RDB

### Konfiguracja domyślna Redisa

```
    save 900 1     # every 15 minutes if at least one key changed
    save 300 10    # every 5 minutes if at least 10 keys changed
    save 60 10000  # every 60 seconds if at least 10000 keys changed

    dbfilename dump.rdb  # The filename where the DB must be dumped
```
Oprócz dokumentacji warto poczytać też:

„[Redis Persistence Deep Dive](https://www.memurai.com/blog/redis-persistence-deep-dive)"

## Instalacja z użyciem Dockera

Aby pobrać obraz najnowszej wersji serwera Redis i uruchomić bazujący na nim kontener
należy wykonać następujące polecenie:

```
docker container run --name redis-server -d -p 6379:6379 redis
```

Aby zatrzymać kontener można użyć interfejsu __Docker Desktop__ bądź z poziomu terminala wydać polecenie

```
docker container stop redis-server
```

Do ponownego uruchamiania korzystaj z __Docker Desktop__ lub polecenia:

```
docker container start redis-server
```

Polecenie do uruchomienia Redis-CLI w kontenerze:

```
docker run -it --link redis-server:redis --rm redis redis-cli -h redis -p 6379
```
### Wygodny graficzny klient Redisa

„[Redis GUI](https://github.com/ekvedaras/redis-gui)”


## Typy danych

- „__napisy__”: dowolne ciągi bajtów (o maksymalnej długości 512MB); długość pamiętana jest „osobno”, a nie wyznaczana poprzez „znak końca napisu” (np. `0x00`)
- __listy__: kolekcje uporządkowane w których elementy (również będące „napisami”) przechowywane są w kolejności wstawiania
- __zbiory__: nieuporządkowane kolekcje unikatowych „napisów”
- __zbiory uporządkowane__: do każdego „napisu” przyporządkowana jest wartość liczbowa typu `float`, zwana jego _oceną_ (ang. _score_)
- __struktury haszowe__: odwzorowanie pól na wartości, gdzie oba komponenty są (oczywiście) „napisami”
- __strumienie__: struktury typu „append-only” złożone z „odwzorowań”
- __tablice bitowe__: ....
- __HyperLogLogs__: ....


## Redis – podstawowe operacje

```
SET <key> <value> [EX sekundy|PX milisekundy] [NX|XX]
```

- EX - czas po jakim wygaśnie klucz w sekundach
- PX - czas po jakim wygaśnie klucz w milisekundach
- NX - wstawianie klucza jeśli wcześniej nie istniał
- XX - aktualizacja wartości klucza, gdy ten istnieje

```
GET <key>
SET <key>
```

Przykład

```
SET user:12:name "Mr Bean"
GET user:12:name
DEL user:12:name
```

„Strukturalność” kluczy użytych powyżej jest oczywiście całkowicie dowolna (w końcu klucze to dowolne „napisy” redisowe, czyli ciągi bajtów).

## Ograniczone w czasie istnienie (powiązań) danych

```
EXPIRE klucz 5
```

```
SET klucz 100 EX 5
```

Powiązanie `klucz` i jego wartość zostanie usunięte po upływie 5s.

Możemy sprawdzić ile pozostało do końca

```
TTL klucz
```

## Redis w Node.js

IOREDIS [dokumentacja](https://github.com/luin/ioredis)

Przykładowy projekt, zawarty w pliku `3-index.js`, demonstruje wykorzystanie Redisa, jako pamięci podręcznej w odwołaniach do zewnętrznych serwisów.

Aby przetestować czas odpowiedzi (z poziomu linii poleceń Linuksa) można wykorzystać polecenie `curl`:


```
curl -o /dev/null -w "\n%{time_starttransfer}\n" http://localhost:3000/items/3501
```

Oczywiście wartość `3501`mozna zmienić na dowolną (nie większą niż `5000`).
