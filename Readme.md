# Self hosted tiny quizzlet 
You can create your collect of question and then learn that

## How to use

### Host backend
Firstly, install the dependence of backend api by using 
```bash
cd backend
bun i
```
then you can run api by type
```bash
bun run src/index.ts
```
then you can use something like cf tunnel to expose backend api 

### Host frontend
I recommend you to use somethings like vercel to optimize the performance and easier to deploy. You just need to put the backend api url (after expose) to `BE_URL` in environment variable config.

## Feature
- flashcard
- multiple choice exam 
