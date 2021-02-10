const express = require('express');
var morgan = require('morgan');
const app = express()
app.use(express.json())

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})


morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})
let persons = [
  
      {
        "id": 1,
        "name": "kouakou",
        "number": "565"
      },
      {
        "id": 3,
        "name": "yao",
        "number": "24216712"
      },
      {
        "id": 5,
        "name": "Guy mosso",
        "number": "027842"
      },
      {
        "id": 6,
        "name": "ihsd",
        "number": "6464"
      },
      {
        "id": 7,
        "name": "amara",
        "number": "424511159"
      },
      {
        "id": 8,
        "name": "sylla",
        "number": "66661662"
      },
      {
        "id": 9,
        "name": "je",
        "number": "5454"
      },    
  ]
  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  
  response.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id);
    if(person){
      res.json(person)
    }else{
      res.status(4000).end()
    }
    
    response.json(person)
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons= persons.filter(person => person.id !== id)
   
    res.status(204).end()
  })

  /* post */

  app.post('/api/persons', (req, res) => {

    const body=req.body
    
      const person={
      id:generateId(),
      name:body.name,
      number:body.number

    }
    persons=persons.concat(person)
    res.json(person)

  })


  app.get('/info',(req,res)=>{
const p=persons.length
const d=new Date()
    res.send(`<p>Phonebook has info for ${p}</p> <p> ${d}</p> `)
  })


  app.use(morgan('combined'))

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})