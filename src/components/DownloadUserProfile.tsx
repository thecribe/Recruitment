import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";

// ============== STYLES ==============
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 35,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2pt solid #1e40af",
    paddingBottom: 8,
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#1e40af",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    color: "#1e40af",
    fontWeight: "bold",
  },
  sectionTitle: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    fontSize: 12,
    fontWeight: "bold",
    padding: "6 10",
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1e40af",
    color: "#ffffff",
    padding: "6 8",
    fontWeight: "bold",
    borderBottom: "1pt solid #1e40af",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #d1d5db",
    minHeight: 22,
  },
  tableCell: {
    padding: "6 8",
    flex: 1,
    borderRight: "1pt solid #d1d5db",
  },
  lastCell: {
    padding: "6 8",
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    width: 140,
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 35,
    right: 35,
    textAlign: "center",
    fontSize: 8,
    color: "#4b5563",
    borderTop: "1pt solid #e5e7eb",
    paddingTop: 8,
  },
  signatureBox: {
    border: "1pt solid #000",
    height: 80,
    width: "100%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    fontSize: 9,
  },
});

// ============== REUSABLE FOOTER ==============
const Footer = () => (
  <Text style={styles.footer}>
    Arise Nursing • The Vicarage Old Cardiff Road • Ph: +44-3301335287 •
    adesola.olawale@arisenursing.co.uk
  </Text>
);

// ============== MAIN DOCUMENT COMPONENT ==============
const DownloadUserProfile = () => (
  <Document>
    {/* ====================== PAGE 1 ====================== */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🏠</Text>
        </View>
        <Text style={styles.title}>STAFF MANAGER</Text>
      </View>

      {/* Staff Name / Email / Gender / Nationality */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>Staff Name</Text>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>Email</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Gender</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Nationality</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          Blessed Eguaje Orhewere
        </Text>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          blessedoje76@gmail.com
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Nigerian</Text>
      </View>

      {/* DOB & Contact */}
      <View style={[styles.tableHeader, { marginTop: 15 }]}>
        <Text style={[styles.tableCell, { flex: 1 }]}>Date of Birth</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Contact</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1 }]}>25-04-1978</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>07438436194</Text>
      </View>

      {/* Address Details */}
      <Text style={styles.sectionTitle}>ADDRESS DETAILS</Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>
          2 RUTH SQUARE{"\n"}
          SHEFFIELD{"\n"}
          SOUTH YORKSHIRE{"\n"}
          S10 2FY
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.value}>United Kingdom</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📄 Uploaded File</Text>
      </View>

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>07438436194</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>blessedoje76@gmail.com</Text>
      </View>

      {/* Emergency Contact */}
      <Text style={styles.sectionTitle}>EMERGENCY CONTACT</Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Name of Next of Kin</Text>
        <Text style={styles.value}>Joy Orhewere</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Relationship</Text>
        <Text style={styles.value}>Spouse</Text>
      </View>

      <Footer />
    </Page>

    {/* ====================== PAGE 2 ====================== */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>CURRENT ADDRESS</Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>
          51 Cape Lindsey Rd{"\n"}
          Newport{"\n"}
          Wales{"\n"}
          No20 2SD
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>07448672735</Text>
      </View>

      {/* Current Job Details */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        CURRENT JOB DETAILS
      </Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 1.2 }]}>JOB TITLE</Text>
        <Text style={[styles.tableCell, { flex: 1.8 }]}>
          CURRENT PLACE OF WORK
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>CURRENT PAY P/H</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>DAY/NIGHT SHIFT</Text>
        <Text style={[styles.tableCell, { flex: 2 }]}>DUTIES</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1.2 }]}>Care Worker</Text>
        <Text style={[styles.tableCell, { flex: 1.8 }]}>
          PIC24 Health Care Ltd, Sheffield
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>£12.50</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Day/Night Shift</Text>
        <Text style={[styles.tableCell, { flex: 2, fontSize: 9 }]}>
          • Provide person-centred care to service users with diverse health and
          support needs.{"\n"}• Assist with daily living activities including
          personal hygiene, dressing, feeding, and mobility.{"\n"}• Administer
          medication in line with care plans and maintain accurate care records.
        </Text>
      </View>

      {/* Previous Job Details */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        PREVIOUS JOB DETAILS
      </Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 0.9 }]}>FROM</Text>
        <Text style={[styles.tableCell, { flex: 0.9 }]}>TO</Text>
        <Text style={[styles.tableCell, { flex: 1.6 }]}>NAME OF EMPLOYER</Text>
        <Text style={[styles.tableCell, { flex: 1.3 }]}>JOB TITLE</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>REASON FOR LEAVING</Text>
        <Text style={[styles.tableCell, { flex: 2.3 }]}>
          MAIN RESPONSIBILITIES
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 0.9 }]}>01-01-2020</Text>
        <Text style={[styles.tableCell, { flex: 0.9 }]}>12-08-2027</Text>
        <Text style={[styles.tableCell, { flex: 1.6 }]}>
          Genol Clinic &amp; Laboratory
        </Text>
        <Text style={[styles.tableCell, { flex: 1.3 }]}>
          Healthcare Assistant
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>Relocation</Text>
        <Text style={[styles.tableCell, { flex: 2.3, fontSize: 9 }]}>
          • Provided direct care and support to patients with physical and
          mental health needs.{"\n"}• Assisted with nutrition, hygiene,
          mobility, and medication routines.{"\n"}• Maintained a clean, safe,
          and hygienic clinical environment.{"\n"}• Observed, monitored, and
          documented patient conditions and escalated concerns appropriately.
          {"\n"}• Offered emotional support and companionship to patients.
        </Text>
      </View>

      <Footer />
    </Page>

    {/* ====================== PAGE 3 ====================== */}
    <Page size="A4" style={styles.page}>
      {/* Educational Qualification */}
      <Text style={styles.sectionTitle}>EDUCATIONAL QUALIFICATION</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>ESTABLISHMENT</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>FROM</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>TO</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>QUALIFICATION</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          Ambrose Alli University
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>07-07-2004</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>20-06-2009</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>BA</Text>
      </View>

      {/* Right to Work */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        RIGHT TO WORK
      </Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Your entitlement for working in the UK is based upon what status
        </Text>
        <Text style={styles.value}>Student Visa</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Passport/VISA/BRP/RTW Expiry Date</Text>
        <Text style={styles.value}>30-01-2026</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Share Code</Text>
        <Text style={styles.value}>WPH LLE 6JT</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📄 Uploaded File</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📄 Uploaded File</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📄 Uploaded File</Text>
      </View>

      {/* Professional Memberships */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        PROFESSIONAL MEMBERSHIPS
      </Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Professional Body/Type</Text>
        <Text style={styles.value}>Nil</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>PIN (if applicable)</Text>
        <Text style={styles.value}>Nil</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Renewal Date (if applicable)</Text>
        <Text style={styles.value}>Nil</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Current DBS Disclosure (Formally known as CRB)
        </Text>
        <Text style={styles.value}>Enhanced</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Issue Date</Text>
        <Text style={styles.value}>27-03-2025</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Clear</Text>
        <Text style={styles.value}>Yes</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Disclosure Number</Text>
        <Text style={styles.value}>001919075456</Text>
      </View>

      <Footer />
    </Page>

    {/* ====================== PAGE 4 ====================== */}
    <Page size="A4" style={styles.page}>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Is this certificate registered with the updated service?
        </Text>
        <Text style={styles.value}>Yes</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📄 Uploaded File</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📸 Uploaded File</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Expiry Date</Text>
        <Text style={styles.value}>27-03-2026</Text>
      </View>

      {/* Bank Payment Details */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        BANK PAYMENT DETAILS
      </Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Name of Bank/Building Society</Text>
        <Text style={styles.value}>Lloyd's Bank</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Account Name</Text>
        <Text style={styles.value}>Blessed Eguaje Orhewere</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Account Type</Text>
        <Text style={styles.value}>Personal</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>
          2 Ruth square{"\n"}
          Sheffield{"\n"}
          S10 2FY
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Account No</Text>
        <Text style={styles.value}>814 162 60</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Sort Code</Text>
        <Text style={styles.value}>77-77-53</Text>
      </View>

      {/* Immunisations */}
      <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
        IMMUNISATIONS
      </Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Signature</Text>
        <View style={styles.signatureBox}>
          <Text style={{ fontSize: 9, color: "#666" }}>
            Signed digitally – 06-08-2025
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>06-08-2025</Text>
      </View>

      <Footer />
    </Page>

    {/* ====================== PAGE 5 ====================== */}
    <Page size="A4" style={styles.page}>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Do you hold a valid UK driver’s licence?
        </Text>
        <Text style={styles.value}>No</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Do you have use of a car?</Text>
        <Text style={styles.value}>No</Text>
      </View>

      {/* Health Declarations + other declarations */}
      {[
        "HEALTH DECLARATIONS",
        "DISABILITY DISCRIMINATION ACT",
        "CONFIDENTIALITY",
        "CONSENT FOR THE USE OF STAFF PHOTOGRAPHIC IMAGES",
        "PERSONAL DECLARATIONS",
        "WORKING TIME REGULATIONS DECLARATIONS",
      ].map((title) => (
        <React.Fragment key={title}>
          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>{title}</Text>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Uploaded File</Text>
            <Text style={styles.value}>📸 Uploaded File</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>06-08-2025</Text>
          </View>
        </React.Fragment>
      ))}

      <Footer />
    </Page>

    {/* ====================== PAGE 6 ====================== */}
    <Page size="A4" style={styles.page}>
      {/* Other declarations */}
      <Text style={styles.sectionTitle}>OTHER DECLARATIONS</Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📸 Uploaded File</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>06-08-2025</Text>
      </View>

      {/* Health and Safety */}
      <Text style={[styles.sectionTitle, { marginTop: 12 }]}>
        HEALTH AND SAFETY
      </Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📸 Uploaded File</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>06-08-2025</Text>
      </View>

      {/* Rehabilitation of Offenders */}
      <Text style={[styles.sectionTitle, { marginTop: 12 }]}>
        REHABILITATION OF OFFENDERS ACT 1974
      </Text>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Do you have any convictions, cautions or bindovers?
        </Text>
        <Text style={styles.value}>No</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Have you ever had disciplinary action taken against you?
        </Text>
        <Text style={styles.value}>No</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Are you at present the subject of criminal charges or disciplinary
          action?
        </Text>
        <Text style={styles.value}>No</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Do you consent to Arise Nursing requesting a police check and any
          appropriate references on your behalf?
        </Text>
        <Text style={styles.value}>Yes</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>
          Have you been police checked in the last three years?
        </Text>
        <Text style={styles.value}>No</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.label}>Uploaded File</Text>
        <Text style={styles.value}>📸 Uploaded File</Text>
      </View>

      <Footer />
    </Page>

    {/* ====================== PAGE 7 ====================== */}
    <Page size="A4" style={styles.page}>
      {/* Referee Details */}
      <Text style={styles.sectionTitle}>REFEREE DETAILS</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>REFEREE DETAILS</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>RELATIONSHIP</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>REFERENCE TYPE</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>REFERENCE DATE</Text>
      </View>
      {/* Referee 1 */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          Loveline Obenndip{"\n"}
          07947661891{"\n"}
          enquiries@pic24healthcareltd.co.uk
        </Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Care Manager</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>
          Employment Reference
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>26-01-2026</Text>
      </View>
      {/* Referee 2 */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          Claire Craven{"\n"}
          07495176913{"\n"}
          claire.c@4serve.co.uk
        </Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Area Manager</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>
          Employment Reference
        </Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>26-01-2026</Text>
      </View>

      {/* References tables (two separate tables) */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>References</Text>

      {/* First reference response */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, { flex: 2 }]}>
          REFERENCE DETAILS: Employment Reference
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Loveline Obenndip</Text>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          enquiries@pic24healthcareltd.co.uk
        </Text>
        <Text style={[styles.tableCell, { flex: 1.2 }]}>07947661891</Text>
        <Text style={[styles.tableCell, { flex: 1.2 }]}>Care Manager</Text>
        <Text style={[styles.tableCell, { flex: 0.8 }]}>26-01-2026</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Email Sent on</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>26-01-2026 13:39</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Referee Responded</Text>
        <Text style={[styles.tableCell, { flex: 1.5, color: "#16a34a" }]}>
          ✅ Referee Responded
        </Text>
      </View>

      {/* Second reference response */}
      <View style={[styles.tableRow, { marginTop: 12 }]}>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Claire Craven</Text>
        <Text style={[styles.tableCell, { flex: 2.5 }]}>
          claire.c@4serve.co.uk
        </Text>
        <Text style={[styles.tableCell, { flex: 1.2 }]}>07495176913</Text>
        <Text style={[styles.tableCell, { flex: 1.2 }]}>Area Manager</Text>
        <Text style={[styles.tableCell, { flex: 0.8 }]}>26-01-2026</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Email Sent on</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>26-01-2026 13:47</Text>
        <Text style={[styles.tableCell, { flex: 1.5 }]}>Referee Responded</Text>
        <Text style={[styles.tableCell, { flex: 1.5, color: "#16a34a" }]}>
          ✅ Referee Responded
        </Text>
      </View>

      <Footer />
    </Page>

    {/* ====================== PAGE 8 ====================== */}
    <Page size="A4" style={styles.page}>
      {/* Blank page with only footer (as in original) */}
      <View style={{ flex: 1 }} />
      <Footer />
    </Page>
  </Document>
);

// ============== HOW TO USE ==============
/*
  // 1. Preview in browser
  <PDFViewer width="100%" height="800px">
    <DownloadUserProfile />
  </PDFViewer>

  // 2. Download button
  <PDFDownloadLink document={<DownloadUserProfile />} fileName="Arise_Nursing_Staff_Manager_Blessed_Eguaje_Orhewere.pdf">
    {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
  </PDFDownloadLink>

  // 3. Server-side (Next.js API, Node, etc.)
  import { pdf } from '@react-pdf/renderer';
  const buffer = await pdf(<DownloadUserProfile />).toBuffer();
*/

export default DownloadUserProfile;
