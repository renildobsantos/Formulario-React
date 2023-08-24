import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import img from './assets/react.png'

const schema = yup

  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
    password: yup.string().min(6, "A senha deve conter 6 digitos").required("A senha é obrigatória"),
    confirmPassword: yup.string().required("Confirmar a senha é obrigatório").oneOf([yup.ref("password")], "As senhas deven ser iguais"),
  })
  .required()

function App() {

  // Utilizando a biblioteca React-hook-form
  // Usar o (Handle errors), precisamos instalar => npm install @hookform/resolvers yup

  const {register, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(userData){
    console.log(userData)
  }
  
  return (

    <>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="circulo"></div>
      
      <div className="titulo">
        <img src={img} alt="imagem-logo" />
        <h1>Formulário</h1>
      </div>
      
      <label>
        Nome 
        <input type="text" {...register("name", { required: true })}/>
        <span>{errors.name?.message}</span>
      </label>

      <label>
        Email 
        <input type="text" {...register("email")}/>
        <span>{errors.email?.message}</span>
      </label>

      <label>
        Senha 
        <input type="password" {...register("password")}/>
        <span>{errors.password?.message}</span>
      </label>  

      <label>
        Confirmar Senha
        <input type="password" {...register("confirmPassword")}/>
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type="submit">Cadastrar</button>
    </form>

    <footer>
      <p>Todos os direitos reservados @ 2023</p>
    </footer>
    </>

  )
}

export default App;
