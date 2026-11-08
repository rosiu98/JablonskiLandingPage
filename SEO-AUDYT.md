# Audyt i poprawki SEO — 8 listopada 2026

Dotyczy `https://jablonski-naukajazdy.pl/` oraz plików projektu. Poprawki przygotowano lokalnie. Publikacja w Netlify i czynności na koncie Google Search Console są opisane w [SEO-WDROZENIE.md](SEO-WDROZENIE.md).

## Najważniejsze ustalenia i wdrożone poprawki

| Obszar | Przed audytem | Stan lokalnych plików po poprawkach |
| --- | --- | --- |
| Adresy kanoniczne | Cztery strony wskazywały inne, skrócone adresy niż faktyczne podstrony | Każda z 14 stron wskazuje swój rzeczywisty docelowy adres HTTPS |
| Mapa strony | Tylko strona główna i FAQ | `sitemap.xml` zawiera 14 właściwych adresów, bez aliasów i przypadkowych dat |
| Roboty | Brak pliku `robots.txt`; publiczny URL zwracał 404 | Plik ze zgodą na skanowanie i odnośnikiem do mapy witryny |
| Struktura | Brak stron zbiorczych oferty i lokalizacji | Nowe `/nauka-jazdy/` i `/lokalizacje/` z przydatną treścią i bezpośrednimi linkami do szczegółów |
| Linkowanie | Część linków prowadziła do skróconego adresu doszkalających; stopki kierowały głównie do fragmentów strony głównej | Poprawione odnośniki, linki do obu stron zbiorczych w menu, osiem podstron w stopce, widoczna ścieżka nawigacji |
| Metadane | Niepełne dane Open Graph; brak pełnej spójności między adresami i opisami | Osobne tytuły, opisy, canonical, Open Graph i karty społecznościowe na wszystkich stronach |
| Dane uporządkowane | Graf tylko na stronie głównej | Statyczny JSON-LD na 14 stronach: osoba, firma lokalna, witryna, właściwa strona, usługi i breadcrumbs |
| Dane lokalne | Ulica widoczna głównie w tytule osadzonej mapy | Pełny adres Proszowic widoczny w stopce; Kraków opisany jako obszar prowadzenia jazd |
| Obrazy | Cztery zdjęcia opinii bez atrybutu `alt`; część zdjęć bez wymiarów | Wszystkie obrazy mają `alt`; brakujące wymiary zdjęć rastrowych uzupełnione rzeczywistymi rozmiarami |
| Ładowanie | Niepotrzebny blokujący jQuery na wielu stronach; Swiper również poza karuzelą | jQuery usunięty; Swiper pozostał na stronie głównej, gdzie działa karuzela |
| Treść bez JavaScript | Elementy reveal mogły pozostać niewidoczne | Fallback `noscript` pokazuje treść; podstawowa nawigacja i FAQ są dostępne bez JS |
| Aktualność informacji | Na kategorii B i FAQ stary próg wieku 18 lat; nieścisłości dotyczące PKK, odbiorców dodatkowych jazd i egzaminów w obu miastach | Aktualne zasady wieku i zgody, PKK przed kursem, doprecyzowanie przygotowania do egzaminu w Krakowie i opisu doszkalających |

Nie zmieniono działających adresów usług i lokalizacji. `_redirects` przygotowuje przekierowania 301 dla dawnych skróconych adresów, `/faq/faq.html`, `/strona-glowna/` oraz wariantów z `index.html`. Reguły są przeznaczone dla Netlify; ich rzeczywistą odpowiedź HTTP należy sprawdzić po publikacji. Publiczna domena już przekierowuje HTTP i `www` do HTTPS bez `www`.

## Relacje w danych uporządkowanych

- `https://jablonski-naukajazdy.pl/#person` identyfikuje Jerzego Jabłońskiego na każdej stronie.
- `#business` identyfikuje działalność z adresem Bogusława Kleszczyńskiego 10, 32-100 Proszowice, telefonem i rzeczywistą mapą Google.
- Poszczególne usługi mają własne adresy i identyfikatory `#service`; ich `provider` wskazuje wspólną osobę.
- Breadcrumbs odpowiadają linkom widocznym na stronie. Kraków i Proszowice są obszarem obsługi, bez dopisywania nieistniejącego oddziału w Krakowie.
- Ceny są nadal pobierane z arkusza. Nie wpisano na stałe cen do `Offer` ani ocen do `AggregateRating`.

Google wymaga zgodności danych uporządkowanych z rzeczywistą treścią. Sam schemat nie zapewnia określonego wyglądu wyniku. [Dokumentacja LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=pl).

## Sprawdzenie poprawności

Kontrola statyczna objęła wszystkie 14 stron i przeszła 409 sprawdzeń: unikalność metadanych, właściwe canonical, mapa strony i roboty, poprawność JSON-LD i relacji, zgodność breadcrumbs, istniejące obrazy oraz linki lokalne. Każda strona ma jeden H1. Wewnętrzna kontrola JSON-LD nie zastępuje testu opublikowanej strony w narzędziach Google.

W Chrome sprawdzono strony na komputerze i telefonie, a także wąskie szerokości oraz granicę przełączenia menu. Nie wykryto poziomego przewijania ani nieobsłużonych błędów JavaScript. Dodatkowe sprawdzenia objęły FAQ z klawiatury, treść i menu bez JS, walidację formularza oraz podstawianie cen dla właściwych kart na cenniku i podstronach B/C/C+E. Formularz sprawdzono bez wysyłania wiadomości; dane cenowe podstawiono kontrolowaną odpowiedzią CSV, co weryfikuje działanie kodu, a nie dostępność arkusza Google w danej chwili.

Sprawdzono składnię JS i powtarzalność lokalnego generatora metadanych. Wspólne `script.js` oraz `prices.js` zachowały zawartość sprzed tego audytu. Zmiany wydajnościowe ograniczają zbędne zasoby; nie przypisano stronie wyniku Lighthouse ani wartości Core Web Vitals bez pomiaru.

## Co pozostaje po stronie publikacji i Google

1. Opublikowanie plików i `_redirects` w istniejącym projekcie Netlify oraz kontrola docelowych statusów HTTP: strony 200, aliasy 301, nieistniejące adresy 404.
2. Weryfikacja dostępu do usługi Search Console, przesłanie mapy i test wersji opublikowanej. Zachowano istniejący plik i metatag weryfikacji.
3. Kontrola indeksowania, wybranego przez Google adresu kanonicznego, zapytań i rzeczywistych Core Web Vitals po zebraniu danych. Dane z konta Search Console i Profilu Firmy nie były dostępne podczas audytu.
4. Spójne i aktualne dane w istniejącym Profilu Firmy oraz rzeczywiste opinie klientów. Dalszy rozwój treści powinien opisywać faktyczne szkolenia i pytania kursantów.

Linki pod głównym wynikiem wyszukiwania to sitelinks. Google wybiera je automatycznie; uporządkowana nawigacja, tytuły i linki pomagają zrozumieć witrynę, lecz nie pozwalają wymusić konkretnego zestawu ani kolejności. [Dokumentacja sitelinks](https://developers.google.com/search/docs/appearance/sitelinks?hl=pl).

FAQ pozostaje treścią dla kursantów. Google wycofał wyniki rozszerzone FAQ od 7 maja 2026 r. [Aktualizacje Google](https://developers.google.com/search/updates). Zasady prawa jazdy sprawdzono w [komunikacie Ministerstwa Infrastruktury](https://www.gov.pl/web/infrastruktura/uwaga-kierowcy--od-3-marca-obowiazuja-nowe-przepisy---sprawdz-co-sie-zmienilo) i [informacjach urzędu o rozpoczęciu szkolenia](https://samorzad.gov.pl/web/powiat-ostrowiecki/referat-rejestracji-pojazdow).

Kolejność przygotowania PKK i zapisu na kurs opisuje [procedura na gov.pl](https://www.gov.pl/web/gov/uzyskaj-prawo-jazdy). Informacje o miejscach egzaminowania publikuje [MORD w Krakowie](https://mord.krakow.pl/oddzialy/).
