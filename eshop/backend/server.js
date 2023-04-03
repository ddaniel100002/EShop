import {dotenv,express,cors,mongoose,seedRouter,productRouter,userRouter} from './imports.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/users',userRouter);
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});


mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
