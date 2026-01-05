require('dotenv').config();
const sanityClient = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = sanityClient({
  projectId: 'egb4d8up',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || '',
  useCdn: false,
});

async function addSafock() {
  try {
    console.log('Starting Safock - AI Voice Agent Platform import...\n');

    // Step 1: Upload the image
    console.log('📤 Uploading project image...');
    const imagePath = path.join(__dirname, '..', 'frontend_portfolio', 'src', 'assets', 'voice_agent.jpg');

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image not found at: ${imagePath}`);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: 'voice_agent.jpg',
    });
    console.log('✓ Image uploaded successfully');

    // Step 2: Create the work document
    console.log('📝 Creating Safock - AI Voice Agent Platform project...');
    const work = await client.create({
      _type: 'works',
      title: 'Safock - AI Voice Agent Platform',
      description: 'An intelligent AI voice agent platform powered by OpenAI\'s cutting-edge agent SDK. Features real-time voice interactions, natural conversation flows, and seamless integration capabilities. Built with a modern tech stack combining FastAPI backend for robust API performance and NextJS frontend for exceptional user experience. Enables businesses to deploy sophisticated voice AI assistants with minimal configuration.',
      projectLink: 'https://safock.com/',
      codeLink: '',
      imgUrl: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      tags: ['AI', 'OpenAI Agents SDK', 'FastAPI', 'NextJS'],
    });

    console.log('✓ Safock - AI Voice Agent Platform project created successfully!');
    console.log('\n📊 Project Details:');
    console.log('   Title:', work.title);
    console.log('   Live URL:', work.projectLink);
    console.log('   Tags:', work.tags.join(', '));
    console.log('\n✨ Your project has been published to Sanity!');
    console.log('🔄 Refresh your localhost to see the changes.');
  } catch (error) {
    console.error('✗ Error:', error.message);
    if (error.response) {
      console.error('   Details:', error.response.body || error.response);
    }
    process.exit(1);
  }
}

addSafock();
