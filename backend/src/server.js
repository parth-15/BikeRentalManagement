import app from './app';

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
