import React, { memo } from 'react';

const Name = memo(({ nameValue }) => {
  console.log("Child (Name) rendered!");
  
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Child Component (Name)</h3>
      <p>Processed Name: <strong className="text-purple-600">{nameValue}</strong></p>
    </div>
  );
});


Name.displayName = 'Name';

export default Name;
