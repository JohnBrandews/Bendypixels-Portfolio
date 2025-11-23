import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'pgh7r241',
    dataset: 'myportfolio',
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function testSanity() {
    try {
        console.log('Fetching projects...');
        const projects = await client.fetch('*[_type == "project"]');
        console.log('Projects found:', projects.length);
        console.log(JSON.stringify(projects, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

testSanity();
