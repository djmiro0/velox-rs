import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

export default function Legal() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Legalna obaveštenja za aplikaciju VeloxRS</Text>

      <Text style={styles.sectionTitle}>1. Uvod</Text>
      <Text style={styles.paragraph}>
        VeloxRS je mobilna aplikacija razvijena s ciljem unapređenja bezbednosti saobraćaja. Aplikacija pruža korisnicima informacije o lokacijama saobraćajnih kamera, radovima na putevima i saobraćajnim gužvama, kako bi ih podstakla na odgovornu i bezbednu vožnju.
      </Text>

      <Text style={styles.sectionTitle}>2. Pravna osnova za upotrebu aplikacije</Text>
      <Text style={styles.paragraph}>
        Prema Zakonu o bezbednosti saobraćaja na putevima Republike Srbije, informacije o obeležjima bezbednosti saobraćaja, uključujući lokacije saobraćajnih kamera, su javne i dostupne svima pod jednakim uslovima, osim onih čije objavljivanje je zakonom zabranjeno.
      </Text>
      <Text style={styles.paragraph}>
        Takođe, Zakon o zaštiti podataka o ličnosti Republike Srbije omogućava obradu podataka o ličnosti u javnim prostorima, kao što su saobraćajnice, pod uslovom da se poštuju prava lica čiji se podaci prikupljaju.
      </Text>

      <Text style={styles.sectionTitle}>3. Upotreba podataka</Text>
      <Text style={styles.paragraph}>
        Podaci o saobraćajnim kamerama koji se koriste u aplikaciji VeloxRS su javno dostupni i prikupljeni iz pouzdanih izvora. Aplikacija ne prikuplja lične podatke korisnika niti snima ili deli video sadržaje sa učesnicima u saobraćaju.
      </Text>

      <Text style={styles.sectionTitle}>4. Ograničenja odgovornosti</Text>
      <Text style={styles.paragraph}>
        VeloxRS ne preuzima odgovornost za tačnost i ažurnost informacija o saobraćajnim kamerama, radovima na putevima i saobraćajnim gužvama. Korisnici su odgovorni za proveru tačnosti informacija i pridržavanje saobraćajnih propisa.
      </Text>

      <Text style={styles.sectionTitle}>5. Kontakt</Text>
      <Text style={styles.paragraph}>
        Za dodatne informacije ili pitanja u vezi sa upotrebom aplikacije VeloxRS, možete nas kontaktirati putem e-mail adrese: tvojemail@domena.com
      </Text>

      <Text style={styles.note}>
        Napomena: Preporučuje se da se konsultujete sa pravnikom kako bi osigurali da je sadržaj Legal page-a u skladu sa svim važećim zakonima i regulativama.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 16,
  },
});
