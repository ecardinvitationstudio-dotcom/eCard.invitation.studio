#!/usr/bin/env python3
import os

# Change to src directory
os.chdir('src')

with open('App.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all corrupted emoji and symbols
replacements = {
    'âœ‰ï¸': '✉️',
    'âš ï¸': '⚠️',
    'âŒ': '❌',
    'â€œ': '"',
    'â€': '"',
    'â€"': '–',
    'â†'': '→',
    'âœ¨': '✨',
    'âœ…': '✅',
    'â˜…': '⭐',
    'ðŸ"ž': '📞',
    'ðŸ"‹': '📋',
    'ðŸ"·': '📷',
    'ðŸ'Ž': '🎎',
    'ðŸŎ': '🎁',
    'ðŸš€': '🚀',
    'ðŸ"': '🔔',
    'ðŸ¢': '🏢',
    'ðŸ"±': '📱',
    'ðŸŽ¨': '🎨',
    'ðŸ'°': '💰',
    'ðŸ"¸': '📸'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('App.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ All emoji encoding issues fixed!')
