const fs = require('fs');
const path = require('path');

// Files to fix
const files = [
  'src/modules/users/users.controller.ts',
  'src/modules/common/health.controller.ts',
  'src/modules/auth/dto/auth.dto.ts',
  'src/modules/users/dto/user.dto.ts',
  'src/common/dto/api-response.dto.ts',
  'src/common/dto/pagination.dto.ts'
];

// Swagger decorators to comment out
const decorators = [
  '@ApiTags',
  '@ApiOperation',
  '@ApiResponse',
  '@ApiBearerAuth',
  '@ApiBody',
  '@ApiParam',
  '@ApiQuery',
  '@ApiProperty',
  '@ApiPropertyOptional'
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Comment out import statements
    content = content.replace(
      /import\s*{\s*([^}]*Api[^}]*)\s*}\s*from\s*['"]@nestjs\/swagger['"];?/g,
      '// import { $1 } from \'@nestjs/swagger\';'
    );
    
    // Comment out decorators
    decorators.forEach(decorator => {
      const regex = new RegExp(`^\\s*${decorator.replace('@', '')}`, 'gm');
      content = content.replace(regex, `// ${decorator}`);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('All Swagger decorators commented out!');


