const sanityClient = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = sanityClient({
  projectId: 'egb4d8up',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || '', // Add your token here or use environment variable
  useCdn: false,
});

// Helper function to upload image from URL or file path
async function uploadImage(imagePath) {
  try {
    // Check if it's a URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      const response = await fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const asset = await client.assets.upload('image', Buffer.from(buffer), {
        filename: path.basename(imagePath),
      });
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      };
    } else {
      // It's a local file path
      const imageBuffer = fs.readFileSync(imagePath);
      const asset = await client.assets.upload('image', imageBuffer, {
        filename: path.basename(imagePath),
      });
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      };
    }
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Import Works
async function importWorks(worksData) {
  console.log('Importing works...');
  for (const work of worksData) {
    try {
      const doc = {
        _type: 'works',
        title: work.title,
        description: work.description,
        projectLink: work.projectLink,
        codeLink: work.codeLink,
        tags: work.tags,
      };

      if (work.imgUrl) {
        doc.imgUrl = await uploadImage(work.imgUrl);
      }

      const result = await client.create(doc);
      console.log(`✓ Created work: ${work.title}`);
    } catch (error) {
      console.error(`✗ Error creating work ${work.title}:`, error.message);
    }
  }
}

// Import Abouts
async function importAbouts(aboutsData) {
  console.log('\nImporting abouts...');
  for (const about of aboutsData) {
    try {
      const doc = {
        _type: 'abouts',
        title: about.title,
        description: about.description,
      };

      if (about.imgUrl) {
        doc.imgUrl = await uploadImage(about.imgUrl);
      }

      const result = await client.create(doc);
      console.log(`✓ Created about: ${about.title}`);
    } catch (error) {
      console.error(`✗ Error creating about ${about.title}:`, error.message);
    }
  }
}

// Import Skills
async function importSkills(skillsData) {
  console.log('\nImporting skills...');
  for (const skill of skillsData) {
    try {
      const doc = {
        _type: 'skills',
        name: skill.name,
        bgColor: skill.bgColor,
      };

      if (skill.icon) {
        doc.icon = await uploadImage(skill.icon);
      }

      const result = await client.create(doc);
      console.log(`✓ Created skill: ${skill.name}`);
    } catch (error) {
      console.error(`✗ Error creating skill ${skill.name}:`, error.message);
    }
  }
}

// Import Work Experiences (standalone documents)
async function importWorkExperiences(workExpData) {
  console.log('\nImporting work experiences...');
  const createdIds = [];

  for (const exp of workExpData) {
    try {
      const doc = {
        _type: 'workExperience',
        name: exp.name,
        company: exp.company,
        desc: exp.desc,
      };

      const result = await client.create(doc);
      createdIds.push(result._id);
      console.log(`✓ Created work experience: ${exp.name} at ${exp.company}`);
    } catch (error) {
      console.error(`✗ Error creating work experience ${exp.name}:`, error.message);
    }
  }

  return createdIds;
}

// Import Experiences (with work experience references)
async function importExperiences(experiencesData) {
  console.log('\nImporting experiences...');

  for (const experience of experiencesData) {
    try {
      // First create work experience documents
      const workRefs = [];
      if (experience.works && experience.works.length > 0) {
        for (const work of experience.works) {
          const workDoc = await client.create({
            _type: 'workExperience',
            name: work.name,
            company: work.company,
            desc: work.desc,
          });
          workRefs.push({
            _type: 'reference',
            _ref: workDoc._id,
            _key: workDoc._id,
          });
        }
      }

      // Create experience document with references
      const doc = {
        _type: 'experiences',
        year: experience.year,
        works: workRefs,
      };

      const result = await client.create(doc);
      console.log(`✓ Created experience: ${experience.year}`);
    } catch (error) {
      console.error(`✗ Error creating experience ${experience.year}:`, error.message);
    }
  }
}

// Import Testimonials
async function importTestimonials(testimonialsData) {
  console.log('\nImporting testimonials...');
  for (const testimonial of testimonialsData) {
    try {
      const doc = {
        _type: 'testimonials',
        name: testimonial.name,
        company: testimonial.company,
        feedback: testimonial.feedback,
      };

      if (testimonial.imgurl) {
        doc.imgurl = await uploadImage(testimonial.imgurl);
      }

      const result = await client.create(doc);
      console.log(`✓ Created testimonial: ${testimonial.name}`);
    } catch (error) {
      console.error(`✗ Error creating testimonial ${testimonial.name}:`, error.message);
    }
  }
}

// Import Brands
async function importBrands(brandsData) {
  console.log('\nImporting brands...');
  for (const brand of brandsData) {
    try {
      const doc = {
        _type: 'brands',
        name: brand.name,
      };

      if (brand.imgUrl) {
        doc.imgUrl = await uploadImage(brand.imgUrl);
      }

      const result = await client.create(doc);
      console.log(`✓ Created brand: ${brand.name}`);
    } catch (error) {
      console.error(`✗ Error creating brand ${brand.name}:`, error.message);
    }
  }
}

// Import Contacts
async function importContacts(contactsData) {
  console.log('\nImporting contacts...');
  for (const contact of contactsData) {
    try {
      const doc = {
        _type: 'contact',
        name: contact.name,
        email: contact.email,
        message: contact.message,
      };

      const result = await client.create(doc);
      console.log(`✓ Created contact: ${contact.name}`);
    } catch (error) {
      console.error(`✗ Error creating contact ${contact.name}:`, error.message);
    }
  }
}

// Main import function
async function importData(data) {
  console.log('Starting data import...\n');

  try {
    if (data.works) await importWorks(data.works);
    if (data.abouts) await importAbouts(data.abouts);
    if (data.skills) await importSkills(data.skills);
    if (data.experiences) await importExperiences(data.experiences);
    if (data.testimonials) await importTestimonials(data.testimonials);
    if (data.brands) await importBrands(data.brands);
    if (data.contacts) await importContacts(data.contacts);

    console.log('\n✓ Data import completed!');
  } catch (error) {
    console.error('\n✗ Import failed:', error);
  }
}

// Check if data file is provided
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: node importData.js <path-to-data-file.json>

Example: node importData.js sampleData.json

Make sure to set SANITY_TOKEN environment variable:
  Windows: set SANITY_TOKEN=your_token_here
  Mac/Linux: export SANITY_TOKEN=your_token_here

Or add it directly in the script (not recommended for production).
    `);
    process.exit(1);
  }

  const dataFilePath = path.resolve(args[0]);

  if (!fs.existsSync(dataFilePath)) {
    console.error(`Error: File not found: ${dataFilePath}`);
    process.exit(1);
  }

  if (!client.config().token) {
    console.error('Error: SANITY_TOKEN is not set. Please provide a Sanity token.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  importData(data);
}

module.exports = { importData, client };
