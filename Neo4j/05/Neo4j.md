# Neo4J

Baza grafowa

- zoptymalizowana pod kątem realcji między elementami
- węzły grafu przechowują dane, zaś krawędzie reprezentują relacje
- krawędzie/relacje mogą być tylko jednokierunkowe
- Neo4J to dojrzała baza grafowa (i jedna z najbardziej znanych)
- korzysta z języka zapytań __Cypher__
- Neo4J ma otwartą licencję (kod dostępny na GitHub-ie)
- UWAGA! Iastnieją płatne rozszerzenia o zamkniętym kodzie

## Instalacja z użyciem Dockera

Aby pobrać obraz najnowszej wersji serwera Neo4J i uruchomić bazujący na nim kontener
należy wykonać następujące polecenie:

```
docker run --name neo4j-server -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/s3cr3t neo4j
```

Aby zatrzymać kontener można użyć interfejsu __Docker Desktop__ bądź z poziomy terminala wydać polecenie

```
docker container stop neo4j-server
```

Do ponownego uruchomienia skorzystaj z __Docker Desktop__ lub polecenia:

```
docker container start neo4j-server
```
