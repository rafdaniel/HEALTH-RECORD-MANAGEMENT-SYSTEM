import bcrypt from 'bcrypt';

bcrypt.hash('doctor123', 10).then(hash => {
  console.log('Hashed password for "doctor123":');
  console.log(hash);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
