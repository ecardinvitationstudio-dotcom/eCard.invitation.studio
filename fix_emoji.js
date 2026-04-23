const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src', 'App.js');

try {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    console.log(`Original file size: ${content.length} characters`);
    
    // Fix all corrupted emoji and symbols
    const replacements = [
        ['âœ‰ï¸', '✉️'],
        ['âš ï¸', '⚠️'],
        ['âŒ', '❌'],
        ['â€œ', '"'],
        ['â€', '"'],
        ['â€"', '–'],
        ['â→', '→'],
        ['âœ¨', '✨'],
        ['âœ…', '✅'],
        ['â˜…', '⭐'],
        ['ðŸ"ž', '📞'],
        ['ðŸ"‹', '📋'],
        ['ðŸ"·', '📷'],
        ['ðŸ'Ž', '🎎'],
        ['ðŸŎ', '🎁'],
        ['ðŸš€', '🚀'],
        ['ðŸ"', '🔔'],
        ['ðŸ¢', '🏢'],
        ['ðŸ"±', '📱'],
        ['ðŸŎ', '🎁'],
        ['ðŸŽ¨', '🎨'],
        ['ðŸ'°', '💰'],
        ['ðŸ"¸', '📸']
    ];
    
    let totalReplacements = 0;
    for (const [old, newChar] of replacements) {
        const count = (content.match(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        if (count > 0) {
            content = content.replaceAll(old, newChar);
            totalReplacements += count;
            console.log(`Replaced ${count}x: ${JSON.stringify(old)} → ${JSON.stringify(newChar)}`);
        }
    }
    
    fs.writeFileSync(filepath, content, 'utf-8');
    
    console.log(`\nFinal file size: ${content.length} characters`);
    console.log(`✅ Total replacements: ${totalReplacements}`);
    
} catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
}
