# Wdrożenie strony i konfiguracja Google Search Console

Instrukcja dla `https://jablonski-naukajazdy.pl/`. Stan dokumentacji Google sprawdzony 8 listopada 2026 r.

Zmiany w lokalnych plikach stają się widoczne dla Google dopiero po opublikowaniu ich na hostingu. Ten dokument nie oznacza, że witryna została już przesłana na serwer, konto Search Console zweryfikowane lub strony zindeksowane.

## 1. Opublikuj pliki w istniejącym projekcie Netlify

Publiczny serwer domeny odpowiada nagłówkiem `Server: Netlify`. Zaloguj się do Netlify i wybierz **istniejący projekt**, który obsługuje `jablonski-naukajazdy.pl`. W sekcji domen sprawdź przypięcie tej domeny, aby opublikować zmiany we właściwym projekcie. Zachowaj dostęp do poprzedniego wdrożenia, do którego można wrócić w razie potrzeby.

Przy wdrażaniu ręcznym przygotuj folder zawierający gotowe pliki poniżej i przeciągnij go do obszaru wdrożenia w zakładce **Deploys** tego projektu. Przy wdrażaniu przez repozytorium opublikuj zmiany zwykłym procesem projektu; katalog publikacji musi wskazywać folder, w którym znajdują się gotowe `index.html`, `_redirects`, `robots.txt` i `sitemap.xml`. Strona jest statyczna i nie wymaga kompilowania SASS. [Wdrażanie i aktualizowanie witryn w Netlify](https://docs.netlify.com/deploy/create-deploys/).

Zachowaj ten układ plików w katalogu publikacji:

```text
index.html
script.js
prices.js
robots.txt
sitemap.xml
_redirects
google3fb5f8cdd38d8d19.html
sass/main.css
sass/seo-hubs.css
images/                         wszystkie używane obrazy, ikony i manifest
nauka-jazdy/index.html
nauka-jazdy/kategoria-b/index.html
nauka-jazdy/kategoria-c/index.html
nauka-jazdy/kategoria-c-e/index.html
nauka-jazdy/jazdy-doszkalajace/index.html
lokalizacje/index.html
lokalizacje/nauka-jazdy-krakow/index.html
lokalizacje/nauka-jazdy-proszowice/index.html
o-mnie/index.html
cennik/index.html
opinie/index.html
faq/index.html
kontakt/index.html
```

Plik `index.html` musi znajdować się bezpośrednio w katalogu publikacji. Pliki `.git`, lokalne konfiguracje, katalog `tools` i raporty robocze nie są potrzebne do działania strony; przygotowując folder do ręcznego wdrożenia, kopiuj pliki witryny z powyższej listy. CSS jest utrzymywany bezpośrednio w `sass/main.css`.

Plik `_redirects` jest konfiguracją Netlify. Zapewnia trwałe przekierowania dawnych adresów i wariantów z `index.html` do obecnych adresów. Wgraj go jako plik o dokładnie tej nazwie, bez rozszerzenia `.txt`. Stary `/faq/faq.html` jest obsługiwany przekierowaniem; nie trzeba tworzyć drugiej kopii FAQ. Nie dodawaj globalnej reguły `/* /index.html 200`: nieistniejące strony powinny zwracać błąd 404. [Reguły przekierowań Netlify](https://docs.netlify.com/manage/routing/redirects/overview/).

Po publikacji otwórz stronę główną, menu na telefonie, oba nowe katalogi, wybraną kategorię i formularz kontaktowy. Sprawdź również:

- `https://jablonski-naukajazdy.pl/robots.txt`
- `https://jablonski-naukajazdy.pl/sitemap.xml`
- `https://jablonski-naukajazdy.pl/google3fb5f8cdd38d8d19.html`
- `https://jablonski-naukajazdy.pl/faq/faq.html` — powinien prowadzić do `/faq/`.

Plik weryfikacji powinien wyświetlić dokładnie `google-site-verification: google3fb5f8cdd38d8d19.html`. Każdy adres z mapy witryny powinien otwierać właściwą stronę, a nie komunikat błędu. Jeśli hosting lub CDN przechowuje poprzednie wersje, wyczyść jego pamięć podręczną po publikacji.

## 2. Zachowana struktura adresów

Strona główna przedstawia Jerzego Jabłońskiego. Dwa katalogi porządkują ofertę oraz miejsca prowadzenia jazd; podstrony usług i lokalizacji zachowują istniejące adresy.

| Cel | Adres |
| --- | --- |
| Marka osobista | `/` |
| Oferta nauki jazdy | `/nauka-jazdy/` |
| Kategoria B | `/nauka-jazdy/kategoria-b/` |
| Kategoria C | `/nauka-jazdy/kategoria-c/` |
| Kategoria C+E | `/nauka-jazdy/kategoria-c-e/` |
| Jazdy doszkalające | `/nauka-jazdy/jazdy-doszkalajace/` |
| Obszar działania | `/lokalizacje/` |
| Kraków | `/lokalizacje/nauka-jazdy-krakow/` |
| Proszowice | `/lokalizacje/nauka-jazdy-proszowice/` |
| Informacje pomocnicze | `/o-mnie/`, `/cennik/`, `/opinie/`, `/faq/`, `/kontakt/` |

Wersją docelową jest HTTPS bez `www`. Publiczna domena już przekierowuje warianty HTTP i `www` do tej wersji; zachowaj to ustawienie Netlify. Sam znacznik `canonical` nie przekierowuje użytkownika. Lokalne reguły `_redirects` porządkują dawne skrócone adresy, takie jak `/prawo-jazdy-kategoria-b/` i `/jazdy-doszkalajace/`. Po wdrożeniu sprawdź, czy prowadzą przekierowaniem 301 do odpowiednich stron z tabeli, bez pętli. [Wskazówki Google dotyczące adresów kanonicznych](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=pl).

## 3. Dodaj witrynę do Search Console

Otwórz [Google Search Console](https://search.google.com/search-console/) na swoim koncie Google. Najpierw sprawdź listę usług: jeśli masz już dostęp do tej domeny, wybierz istniejącą usługę. Osoba, która obecnie zarządza witryną w Search Console, może też nadać Ci dostęp.

### Wariant zalecany: usługa domeny

1. Wybierz **Dodaj usługę → Domena**.
2. Wpisz `jablonski-naukajazdy.pl`, bez `https://`, `www` i ukośnika.
3. Skopiuj rekord TXT wygenerowany przez Search Console dla Twojego konta.
4. W panelu dostawcy DNS dodaj go jako nowy rekord TXT domeny głównej. DNS może być zarządzany w Netlify albo u innego dostawcy; sprawdź aktywne serwery nazw domeny. Pole nazwy bywa opisane jako `@` lub pozostawiane puste — zastosuj format wskazany przez dostawcę.
5. Zapisz rekord i wróć do Search Console, aby kliknąć **Zweryfikuj**. Jeśli rekord nie jest jeszcze widoczny, spróbuj ponownie po rozpropagowaniu DNS.

Usługa domeny obejmuje różne protokoły i subdomeny, a jej weryfikacja wymaga DNS. [Typy usług w Search Console](https://support.google.com/webmasters/answer/34592?hl=pl).

### Wariant bez dostępu do DNS: prefiks adresu URL

Dodaj usługę z prefiksem `https://jablonski-naukajazdy.pl/`. Obejmuje ona właśnie ten protokół i host. Następnie wybierz metodę weryfikacji udostępnioną przez Google, np. plik HTML albo metatag.

W projekcie są już istniejące tokeny:

- plik `google3fb5f8cdd38d8d19.html`;
- metatag `google-site-verification` o wartości `Nbm5h1mb-F0lqcyi15JPEs1Ni1sGuXbRFQwL8PfIm1w`.

Ich obecność nie potwierdza dostępu Twojego obecnego konta. Jeśli Search Console wygeneruje inny plik lub tag, dodaj nowy token obok istniejącego. Wartość rekordu DNS kopiuj bezpośrednio z Search Console. Zachowaj działające tokeny również po weryfikacji, ponieważ Google ponownie sprawdza własność. [Weryfikowanie własności witryny](https://support.google.com/webmasters/answer/9008080?hl=pl).

## 4. Prześlij mapę i sprawdź najważniejsze strony

Po opublikowaniu plików wybierz właściwą usługę i otwórz **Mapy witryn**. W polu nowej mapy podaj `https://jablonski-naukajazdy.pl/sitemap.xml`; jeśli formularz pokazuje już prefiks domeny, wpisz `sitemap.xml`. Kliknij **Prześlij** i sprawdź wynik odczytu. Stan „Sukces” oznacza poprawny odczyt mapy, a nie gwarancję zindeksowania wszystkich stron. [Raport Mapy witryn](https://support.google.com/webmasters/answer/7451001?hl=pl).

W pasku sprawdzania adresu URL kolejno sprawdź stronę główną, `/nauka-jazdy/`, cztery usługi, `/lokalizacje/` i obie lokalizacje. Dla istotnie zmienionych stron:

1. Wklej pełny adres, np. `https://jablonski-naukajazdy.pl/nauka-jazdy/kategoria-b/`.
2. Wykonaj test wersji opublikowanej i obejrzyj wyrenderowaną stronę.
3. Sprawdź dostępność dla Google oraz informacje o indeksowaniu i adresie kanonicznym. Dane wybranego przez Google adresu kanonicznego dotyczą zindeksowanej wersji.
4. Jeśli strona jest dostępna i gotowa, użyj **Poproś o zindeksowanie**. Kolejne zgłoszenia tego samego URL nie przyspieszają indeksowania.

Pozostałe adresy Google może odkryć przez mapę i linki. Prośba o indeksowanie nie jest obietnicą terminu ani przyjęcia strony do indeksu. [Narzędzie do sprawdzania adresów URL](https://support.google.com/webmasters/answer/9012289?hl=pl).

## 5. Linki do podstron pod wynikiem, podobne do wyniku Vercel

Rozbudowany wynik marki z dodatkowymi linkami to **linki do podstron**, czyli sitelinks. Google wybiera ich obecność, zestaw i kolejność automatycznie. Nie ma przełącznika w Search Console, który ustawia taki wynik.

Czytelna struktura strony, opisowe tytuły oraz linki do oferty, cennika, kontaktu, opinii i FAQ pomagają wyszukiwarce zrozumieć witrynę. Wyszukiwania marki, np. „Jerzy Jabłoński nauka jazdy”, warto obserwować po publikacji. Samo dodanie `SiteNavigationElement` nie wymusza sitelinks; `SearchAction` nie jest potrzebne witrynie bez własnej wyszukiwarki. Nie ma gwarancji, że wynik będzie wyglądał jak wynik innej marki. [Oficjalna dokumentacja linków do podstron](https://developers.google.com/search/docs/appearance/sitelinks?hl=pl).

## 6. Co sprawdzać po publikacji

**Indeksowanie stron:** sprawdzaj przykłady adresów wykluczonych z indeksu. Przekierowany `/faq/faq.html` może prawidłowo nie być indeksowany. Dla strony usługi analizuj przyczynę: błędny URL, niedostępność serwera, blokada, inny adres kanoniczny lub nieprzetworzona jeszcze strona. Oceniaj konkretne strony, zamiast dążyć do zindeksowania każdego technicznego wariantu adresu. [Raport Indeksowanie stron](https://support.google.com/webmasters/answer/7440203?hl=pl).

**Skuteczność → Wyniki wyszukiwania:** porównuj kliknięcia, wyświetlenia, CTR i średnią pozycję. Filtruj strony oraz zapytania, osobno dla marki, usług i lokalizacji. Przykładowe grupy: „Jerzy Jabłoński”, „jazdy doszkalające Kraków”, „nauka jazdy Proszowice”, „prawo jazdy C”. Porównuj podobne okresy; pojedynczy dzień i średnia pozycja całej witryny nie pokazują pełnego obrazu. GSC mierzy ruch z wyszukiwarki, a nie liczbę telefonów i wysłanych formularzy. [Raport skuteczności](https://support.google.com/webmasters/answer/7576553?hl=pl).

**Core Web Vitals:** obserwuj LCP, INP i CLS oddzielnie na urządzeniach mobilnych oraz komputerach. Raport korzysta z rzeczywistych danych użytkowników; niewielki ruch może oznaczać brak danych. Do bieżącej diagnozy użyj [PageSpeed Insights](https://pagespeed.web.dev/). Test laboratoryjny pomaga znaleźć problem, ale nie zastępuje raportu użytkowników. Przy tej stronie szczególnie warto kontrolować obrazy pierwszego ekranu, wymiary obrazów, ładowanie fontu oraz zewnętrzne widgety. [Raport Core Web Vitals](https://support.google.com/webmasters/answer/9205520?hl=pl).

Wynik testu wydajności ani poprawne dane uporządkowane nie gwarantują wysokiej pozycji. [Google o Core Web Vitals i wynikach wyszukiwania](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=pl).

## 7. Profil Firmy w Google

Sprawdź dostęp do istniejącego Profilu Firmy powiązanego z `https://maps.app.goo.gl/A5hbVNXGcynupmzNA`. Utrzymuj spójne dane: rzeczywistą nazwę działalności, telefon `606 720 252`, adres obsługi klientów, obszar działania, godziny, kategorie usług i odnośnik do witryny. Informacje o Krakowie powinny opisywać faktyczny obszar prowadzenia jazd; kolejna strona lokalizacji nie oznacza automatycznie oddziału pod nowym adresem.

Dodawaj aktualne zdjęcia i odpowiadaj na prawdziwe opinie klientów. Wyniki lokalne zależą m.in. od trafności, odległości i rozpoznawalności, dlatego nie można obiecać konkretnej pozycji w Mapach. Weryfikacja Search Console i weryfikacja Profilu Firmy to osobne czynności. [Wskazówki Google dla wyników lokalnych](https://support.google.com/business/answer/7091?hl=pl).

## 8. Dalsze aktualizacje treści i SEO

Metadane wszystkich 14 stron są zapisane w `tools/seo-pages.mjs`, a reguły danych uporządkowanych w `tools/seo-schema.mjs`. Po zmianie tytułu, opisu lub obrazu uruchom w katalogu projektu `node tools/update-seo.mjs`. Narzędzie aktualizuje statyczny HTML, breadcrumbs, wspólne linki, `robots.txt`, `sitemap.xml` i `_redirects`. Obrazy i ich wymiary są opisane w `tools/seo-image-sizes.json`; po wymianie zdjęcia zaktualizuj również jego wymiary. Zwykła edycja treści pozostaje w odpowiednim pliku HTML. Przeglądarka nie uruchamia tych narzędzi — na hosting trafiają już gotowe pliki i nie trzeba instalować zależności Node do działania strony.

Aktualizuj opisy usług, informacje organizacyjne, rzeczywiste zdjęcia i dane kontaktowe. Nowe sekcje powinny odpowiadać na pytania kursantów, a strony lokalizacji wyjaśniać konkretne różnice w organizacji jazd. Mapa celowo nie zawiera opcjonalnego `lastmod`, aby nie podawać przypadkowych dat. Jeśli później dodasz to pole, wpisuj rzeczywistą datę istotnej aktualizacji danej strony. [Przygotowywanie mapy witryny](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=pl).

FAQ służy użytkownikom. Google wycofał rozszerzone wyniki FAQ od 7 maja 2026 r.; nie należy obiecywać ich uzyskania przez dodanie schematu. [Aktualizacje dokumentacji Google — maj i czerwiec 2026](https://developers.google.com/search/updates).

Opinie o własnej firmie, również wyświetlane za pomocą zewnętrznego widgetu, nie uprawniają strony firmy do gwiazdek opinii przez `AggregateRating` dla `LocalBusiness` lub `Organization`. [Zasady danych uporządkowanych opinii](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

Przy kolejnych zmianach przepisów sprawdzaj aktualność informacji o wieku i formalnościach w oficjalnych źródłach. Przygotowanie techniczne, GSC i linki wewnętrzne ułatwiają Google poznanie strony, ale nie stanowią gwarancji terminu indeksacji, wyświetlenia sitelinks ani określonej pozycji.
