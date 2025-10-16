import jsPDF from "jspdf";

export const generateBrochurePDF = (userInfo?: {
  name: string;
  email: string;
}) => {
  const doc = new jsPDF();

  // Define colors matching the professional format
  const primaryBlue = [52, 73, 162]; // Main blue color
  const secondaryTeal = [13, 148, 136]; // Teal color
  const darkText = [33, 37, 41];
  const lightGray = [248, 249, 250];
  const mediumGray = [134, 142, 150];

  // Page margins
  const leftMargin = 20;
  const rightMargin = 190;
  const pageWidth = 210;
  let yPos = 20;

  // Helper function to add text with proper formatting
  const addText = (
    text: string,
    x: number,
    y: number,
    options: {
      size?: number;
      style?: string;
      color?: number[];
      align?: 'left' | 'center' | 'right';
      maxWidth?: number;
    } = {}
  ) => {
    const { size = 12, style = 'normal', color = darkText, align = 'left', maxWidth } = options;
    
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    
    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string, index: number) => {
        const lineY = y + (index * (size * 0.4));
        if (align === 'center') {
          doc.text(line, x, lineY, { align: 'center' });
        } else {
          doc.text(line, x, lineY);
        }
      });
      return lines.length * (size * 0.4);
    } else {
      if (align === 'center') {
        doc.text(text, x, y, { align: 'center' });
      } else {
        doc.text(text, x, y);
      }
      return size * 0.4;
    }
  };

  // Header Section
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Logo and company name
  addText('AZORIX VLSI', leftMargin, 20, {
    size: 18,
    style: 'bold',
    color: [255, 255, 255]
  });

  addText('Design Verification Course', leftMargin, 32, {
    size: 14,
    color: [255, 255, 255]
  });

  // Top right - Industry Ready
  addText('Industry Ready', rightMargin - 30, 20, {
    size: 10,
    color: [255, 255, 255],
    align: 'right'
  });
  addText('Diploma Programs', rightMargin - 30, 28, {
    size: 10,
    color: [255, 255, 255],
    align: 'right'
  });

  yPos = 55;

  // Course Overview Section
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(leftMargin, yPos, rightMargin - leftMargin, 25, 'F');
  
  addText('COURSE OVERVIEW', pageWidth/2, yPos + 8, {
    size: 14,
    style: 'bold',
    color: secondaryTeal,
    align: 'center'
  });

  addText('Duration: 8 Months | Base Fee: ₹XXXX | Level: Beginner to Advanced', pageWidth/2, yPos + 18, {
    size: 11,
    align: 'center'
  });

  yPos += 35;

  // Description
  const description = 'Transform your career with our comprehensive VLSI Design Verification program. Master the complete digital verification flow from RTL design to advanced verification methodologies.';
  
  yPos += addText(description, leftMargin, yPos, {
    size: 11,
    maxWidth: rightMargin - leftMargin,
    color: darkText
  }) + 10;

  // Core Modules Section
  doc.setFillColor(secondaryTeal[0], secondaryTeal[1], secondaryTeal[2]);
  doc.rect(leftMargin, yPos, rightMargin - leftMargin, 8, 'F');
  
  addText('CORE MODULES (INCLUDED)', leftMargin + 5, yPos + 6, {
    size: 12,
    style: 'bold',
    color: [255, 255, 255]
  });

  yPos += 15;

  const coreModules = [
    '1. Verilog Module (6 weeks) - RTL design fundamentals and digital circuit implementation',
    '2. SystemVerilog Module (8 weeks) - Advanced verification techniques and OOP concepts', 
    '3. UVM Module (10 weeks) - Industry-standard verification methodology'
  ];

  coreModules.forEach(module => {
    addText('•', leftMargin, yPos, { size: 12, color: secondaryTeal });
    yPos += addText(module, leftMargin + 8, yPos, {
      size: 10,
      maxWidth: rightMargin - leftMargin - 10
    }) + 5;
  });

  yPos += 10;

  // Add-on Specializations Section
  doc.setFillColor(255, 193, 7); // Yellow/Orange color
  doc.rect(leftMargin, yPos, rightMargin - leftMargin, 8, 'F');
  
  addText('ADD-ON SPECIALIZATIONS (OPTIONAL)', leftMargin + 5, yPos + 6, {
    size: 12,
    style: 'bold',
    color: [255, 255, 255]
  });

  yPos += 15;

  const specializations = [
    '🚄 PCIe Verification (4 weeks) - +₹25,000',
    '💻 SoC Integration & Verification (6 weeks) - +₹30,000', 
    '🏗️ IP Block Verification & VIP Development (3 weeks) - +₹20,000'
  ];

  specializations.forEach(spec => {
    yPos += addText(spec, leftMargin, yPos, {
      size: 10,
      maxWidth: rightMargin - leftMargin
    }) + 6;
  });

  yPos += 10;

  // Pricing Options Box
  doc.setFillColor(240, 248, 255); // Light blue background
  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(leftMargin, yPos, rightMargin - leftMargin, 30, 'FD');

  addText('PRICING OPTIONS', leftMargin + 5, yPos + 8, {
    size: 12,
    style: 'bold',
    color: primaryBlue
  });

  const pricingOptions = [
    '• Core DV Program: ₹1,20,000 (6 months)',
    '• DV + One Specialization: ₹1,40,000-₹1,50,000 (Most Popular)',
    '• Complete Master Program: ₹1,95,000 - Save ₹25,000! (11 months)'
  ];

  let pricingY = yPos + 15;
  pricingOptions.forEach(option => {
    addText(option, leftMargin + 5, pricingY, { size: 9 });
    pricingY += 6;
  });

  yPos += 40;

  // Why Choose Section
  doc.setFillColor(40, 167, 69); // Green color
  doc.rect(leftMargin, yPos, rightMargin - leftMargin, 8, 'F');
  
  addText('WHY CHOOSE AZORIX VLSI?', leftMargin + 5, yPos + 6, {
    size: 12,
    style: 'bold',
    color: [255, 255, 255]
  });

  yPos += 15;

  const whyChoose = [
    '• 95% Placement Success Rate',
    '• 2 Years Comprehensive Placement Support', 
    '• Industry-Standard Tools & Methodologies',
    '• Real-time Project Experience',
    '• Expert Mentorship from VLSI Professionals',
    '• 50+ Industry Partners for Placements'
  ];

  whyChoose.forEach(item => {
    addText(item, leftMargin, yPos, { size: 10 });
    yPos += 6;
  });

  yPos += 10;

  // Industry Partners
  addText('Industry Partners', leftMargin, yPos, {
    size: 12,
    style: 'bold',
    color: primaryBlue
  });
  yPos += 8;

  addText('Intel, Qualcomm, NVIDIA, Broadcom, AMD, MediaTek, Marvell, Synopsys, Cadence, Mentor Graphics', leftMargin, yPos, {
    size: 9,
    maxWidth: rightMargin - leftMargin,
    color: mediumGray
  });

  yPos += 15;

  // Contact Information Box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(leftMargin, yPos, rightMargin - leftMargin, 25, 'F');

  addText('Ready to transform your career? Contact us today!', pageWidth/2, yPos + 8, {
    size: 12,
    style: 'bold',
    color: primaryBlue,
    align: 'center'
  });

  addText('📞 +91 9052653636 | ✉️ admissions@azorix.com | 🌐 www.azorix.com', pageWidth/2, yPos + 16, {
    size: 9,
    align: 'center'
  });

  addText('📍 3rd Floor, Tech Park Building, HITEC City, Madhapur, Hyderabad', pageWidth/2, yPos + 22, {
    size: 8,
    align: 'center',
    color: mediumGray
  });

  // Footer
  yPos = 280;
  doc.setFillColor(darkText[0], darkText[1], darkText[2]);
  doc.rect(0, yPos, pageWidth, 17, 'F');
  
  addText('© 2024 Azorix Technologies Pvt Ltd. All rights reserved.', pageWidth/2, yPos + 10, {
    size: 8,
    color: [255, 255, 255],
    align: 'center'
  });

  return doc;
};

export const downloadBrochurePDF = (userInfo?: {
  name: string;
  email: string;
}) => {
  const doc = generateBrochurePDF(userInfo);
  const fileName = userInfo
    ? `Azorix-VLSI-Brochure-${userInfo.name.replace(/\s+/g, "-")}.pdf`
    : "Azorix-VLSI-Course-Brochure.pdf";

  doc.save(fileName);
};
