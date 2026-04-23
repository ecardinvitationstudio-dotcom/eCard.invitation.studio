#!/usr/bin/env python3
import sys

filepath = r"c:\Old laptop\Shreya-20240526T090548Z-001\Shreya\invitation-app\src\App.js"

try:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"Original file size: {len(content)} characters")
    
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
        'ðŸŎ': '🎁',
        'ðŸŽ¨': '🎨',
        'ðŸ'°': '💰',
        'ðŸ"¸': '📸'
    }
    
    total_replacements = 0
    for old, new in replacements.items():
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            total_replacements += count
            print(f"Replaced {count}x: {repr(old)} → {repr(new)}")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\nFinal file size: {len(content)} characters")
    print(f'✅ Total replacements: {total_replacements}')
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
