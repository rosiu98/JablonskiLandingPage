# Google Calendar OAuth — przegląd panelu v2 i wdrożenie

Stan: 13 listopada 2026. Przegląd dotyczy archiwum `jablonski-naukajazdy-panel v2.zip`, dokumentów i lokalnych plików strony. Kod potwierdza implementację synchronizacji, ale nie potwierdza stanu wdrożonej bazy, konfiguracji Lovable ani zgody Google.

Odczyt publicznych adresów podczas tego przeglądu: polityka prywatności i regulamin zwracały **404**, panel — **200**. Publikacja dokumentów pozostaje konieczna przed zgłoszeniem. Ten raport i przygotowane poprawki są plikami lokalnymi.

## Co zostało dostosowane na stronie

- Linki do polityki i regulaminu w stopkach wszystkich 16 podstron, również na obu nowych dokumentach.
- Wspólny nagłówek, nawigacja i responsywny wygląd dokumentów; link do informacji o danych przy formularzu kontaktowym.
- Metadane, canonical, breadcrumbs, mapa witryny i przekierowania dla nowych stron.
- Polityka obejmuje stronę WWW, formularz Web3Forms, dostawców i faktyczne przepływy danych w panelu v2.
- Regulamin opisuje synchronizację oraz odróżnia odwołany termin od faktycznie zrealizowanych godzin szkolenia. Parametry 48/24/12 godzin opisuje jako ustawienia domyślne, ponieważ szkoła może je zmieniać.

## Co potwierdza kod panelu v2

Ścieżki poniżej odnoszą się do plików w dostarczonym ZIP-ie.

| Obszar | Ustalenie | Źródło |
| --- | --- | --- |
| Uprawnienia | `calendar.events` i `calendar.calendarlist.readonly` są używane przez integrację | `src/lib/calendar-connection.server.ts`, `calendar-sync.server.ts` |
| OAuth | Pośrednikiem jest Lovable Connector Gateway; AES-256-GCM szyfruje lokalny klucz tego połączenia, a nie bezpośrednio token Google | `src/lib/calendar-connection.server.ts`, `calendar.functions.ts` |
| Synchronizacja | Eksport, aktualizowanie i usuwanie wydarzeń, import jazd, potwierdzanie próśb oraz blokady zajętości | `src/lib/calendar-sync.server.ts`, `calendar-rules.ts`, migracje `0002`, `0008`–`0010` |
| Dane do Google | Imię i nazwisko, e-mail uczestnika, kategoria kursu, termin, miejsce, bilans godzin, notatki i identyfikatory rezerwacji | `exportBooking()` w `src/lib/calendar-sync.server.ts` |
| Dane z Google | Wydarzenia wybranych kalendarzy; dane rozpoznanych jazd trafiają do rezerwacji, a inne blokady przechowują identyfikatory i przedziały czasu | `syncCalendar()`, `import_google_lesson`, tabela `calendar_busy` |
| Zaproszenia | Oczekująca prośba nie zaprasza kursanta; potwierdzona jazda może wysłać zaproszenie, zmiana terminu lub anulowanie — aktualizację | `src/lib/calendar-rules.ts`, `calendar-sync.server.ts` |
| Odłączenie | Jest przycisk „Odłącz”, żądanie usunięcia połączenia u gateway i usuwanie czterech lokalnych zbiorów danych integracji | `src/components/app/calendar-connect.tsx`, `disconnectMyCalendar()` |
| Pozostałe dane | Odłączenie zachowuje rezerwacje i ich identyfikatory wydarzeń; nie usuwa wydarzeń z Google | `disconnectMyCalendar()` i tabela `bookings` |
| Role | Kursant loguje się e-mailem i hasłem; Calendar łączy instruktor. Odczyt zdjęć jest ograniczony dodatkowymi regułami | `src/routes/auth.tsx`, migracje `0003` i `0006` |

Wnioski o braku synchronizacji i odłączania z poprzedniego archiwum **nie dotyczą v2**. Nie należy też obiecywać, że do Google trafia wyłącznie anonimowa informacja o terminie — kod przesyła dane kursanta i notatki.

## Gotowa poprawka interfejsu panelu

W v2 nadal brakuje linków do dokumentów w interfejsie oraz jasnego opisu przetwarzania danych przed rozpoczęciem połączenia Calendar. Sama polityka na stronie nie zastępuje informacji w aplikacji. [Zasady Google Workspace dotyczące informowania użytkownika](https://developers.google.com/workspace/workspace-api-user-data-developer-policy).

Archiwum **`PANEL-POPRAWKI-V2.zip`** zawiera dwa pliki do podmiany w projekcie Lovable:

1. `src/routes/__root.tsx` — stopka z linkami do polityki, regulaminu i strony szkoły, dostępna również przed logowaniem.
2. `src/components/app/calendar-connect.tsx` — widoczny opis danych i celu integracji przed przyciskiem połączenia, z odnośnikiem do odpowiedniej sekcji polityki.

W ZIP-ie jest też krótka instrukcja. Te pliki należą do **panelu**, a nie do statycznej strony Netlify. Po podmianie uruchom zwykły build projektu i sprawdź logowanie oraz widok Calendar. Pełnego buildu panelu ani logowania na produkcji nie wykonywano w ramach tego przeglądu.

Alternatywnie w lokalnym repozytorium panelu można zastosować `PANEL-LINKI-PRAWNE.patch`:

```powershell
git apply --check --ignore-space-change C:/sciezka/PANEL-LINKI-PRAWNE.patch
git apply --ignore-space-change C:/sciezka/PANEL-LINKI-PRAWNE.patch
```

Ścieżkę zastąp lokalizacją pliku. Dopasowanie łatki do źródeł v2 zostało sprawdzone. Poprawka nie zmienia logiki rezerwacji ani zakresów OAuth.

## Kolejność publikacji i konfiguracji

1. **Opublikuj stronę Netlify**, w tym obie podstrony, `sass/legal.css`, wspólny CSS, mapę i `_redirects`. Dokumenty muszą działać publicznie przez HTTPS, bez logowania. Po publikacji sprawdź oba URL-e poniżej — każda strona powinna zwracać 200.
2. **Opublikuj poprawki panelu** z powyższego ZIP-a. Zweryfikuj, że linki działają na ekranie logowania i przy Calendar, a kod oraz dokumenty dotyczą tej samej wersji.
3. **Sprawdź wdrożenie zaplecza:** migracje do `0011`, konfigurację szyfrowania, połączenie Inngest, podpisy zadań, callback Google, mechanizm uzgadniania zmian i odświeżanie kanałów powiadomień. W archiwum są zaimplementowane, ale obecność pliku nie potwierdza ich uruchomienia. Nie uruchamiaj ponownie już zastosowanych migracji bez sprawdzenia historii bazy.
4. **Wykonaj próbę na danych testowych:** połączenie konta instruktora, wybór kalendarzy, utworzenie prośby, potwierdzenie, zaproszenie kursanta, zmiana terminu w obu kierunkach, anulowanie, blokada prywatnym wydarzeniem i odłączenie. Sprawdź również, że kursant nie uzyskuje dostępu do danych innych kursantów.
5. **Ustal projekt obsługujący OAuth.** Kod używa Lovable Connector Gateway. Branding, zgłoszenie i domeny muszą dotyczyć połączenia rzeczywiście obsługującego tę aplikację. Potwierdź w konfiguracji Lovable, czy i gdzie używane są własne dane aplikacji Google; sam ZIP nie wskazuje właściciela projektu Google Cloud.
6. **Ustaw dane marki i domen.** Nazwa aplikacji, kontakt i adresy muszą odpowiadać panelowi. Jako publiczną stronę aplikacji można wskazać własną stronę szkoły, która zawiera opis panelu i link do niego. Polityka powinna być pod tą samą domeną co taka strona aplikacji. Zweryfikuj własność wymaganych domen kontem powiązanym z projektem OAuth. [Wymagania marki i domen Google](https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification).
7. **Uzasadnij rzeczywiste zakresy.** `calendar.calendarlist.readonly` służy wyborowi kalendarzy. `calendar.events` obsługuje odczyt wydarzeń wybranych kalendarzy, synchronizację jazd, zaproszenia, zmiany i anulowanie. Zakresy w konfiguracji mają odpowiadać kodowi i temu, co pokażesz w demonstracji. [Oficjalna lista zakresów Calendar](https://developers.google.com/workspace/calendar/api/auth).
8. **Zgłoś gotową, działającą wersję.** Przygotuj demonstrację procesu upoważnienia, wyboru kalendarzy, synchronizacji i odłączenia oraz uzasadnienie, do czego służą dane. Wymagania procesu dla używanych uprawnień sprawdź w swoim projekcie Google. Aktualne dokumenty pomagają w ocenie, ale nie są decyzją Google o zatwierdzeniu.

Adresy dokumentów do konfiguracji:

| Pole | Wartość |
| --- | --- |
| Publiczna strona aplikacji | `https://jablonski-naukajazdy.pl/` |
| Polityka prywatności | `https://jablonski-naukajazdy.pl/polityka-prywatnosci/` |
| Warunki korzystania | `https://jablonski-naukajazdy.pl/regulamin/` |
| Kontakt | `jablonskiprawko@gmail.com` |

Callbacki i domeny pośrednika wynikają z konfiguracji używanego konektora. Gdy ekran upoważnienia wskazuje inny projekt lub markę niż przygotowywane zgłoszenie, najpierw wyjaśnij to w konfiguracji Lovable.

## Pozostałe sprawdzenia właściciela

Region danych, faktyczne terminy retencji, umowy z dostawcami i zabezpieczenia transferów poza EOG wymagają wglądu w konfigurację usług. ZIP nie dowodzi lokalizacji „Paryż”, retencji analityki „90 dni / rok” ani pełnej anonimizacji, dlatego tych obietnic nie wpisano do polityki. Potwierdź również prawidłową tożsamość administratora danych oraz procedurę usuwania konta i pozostałych danych szkolenia na wniosek.

Usunięcie konta nie ma w kodzie kompletnego samoobsługowego procesu. Przycisk „Odłącz” usuwa dane integracji wymienione w polityce; pozostałe dane wymagają osobnej obsługi. Kalendarze współdzielone mogą ujawnić treść wydarzeń innym uprawnionym osobom — wybierz właściwe ustawienia udostępniania i ogranicz notatki do potrzebnych informacji.

## Zakres sprawdzenia

Porównano kod obu wersji, przepływy danych, zakresy i odłączenie. Uruchomiono istniejące testy czystej logiki Calendar, projekcji godzin oraz przypomnień: **22 testy przeszły**. Testy uruchomiono na kopiach plików w katalogu tymczasowym, dostosowując tylko ścieżki importu do uruchomienia TypeScript przez Node; nie wykonywano zapytań do kont Google ani produkcyjnej bazy. Kontrola strony przeszła **189/189 sprawdzeń**: 16 stron i 12 widoków w Chrome przy szerokościach 1440, 390 i 320 px, linki, canonical, grafy JSON-LD, mapa, tabele, nawigacja i dostępność dokumentów bez JavaScript. Nie jest to pełny audyt bezpieczeństwa usług ani potwierdzenie zgodności prawnej całej działalności.
