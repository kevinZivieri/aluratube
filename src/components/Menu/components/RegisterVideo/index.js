import React from "react";
import { StyledRegisterVideo } from "./styles";
import {createClient} from "@supabase/supabase-js";
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from "next/dist/shared/lib/constants";

function useForm(propsDoForm) {
	const [values, setValues] = React.useState(propsDoForm.initialValues);

	return {
		values,
		handleChange: (evento) => {
			const value = evento.target.value;
			const name = evento.target.name;
			setValues({
				...values,
				[name]: value,
			});
		},
		clearForm() {
			setValues({});
		}
	};
}
const PROJECT_URL = "https://nfexbdtpxzvaedjzrbqz.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZXhiZHRweHp2YWVkanpyYnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNjkxMjQsImV4cCI6MTk4Mzg0NTEyNH0.AXhn3x75LOqexR7a2UdPpoHUAGj9h9xoeZMrDUPGTi4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
	return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}


export default function RegisterVideo() {
	const formCadastro = useForm({
		initialValues: { titulo: "Blabla", url: "https://youtube..." }
	});
	const [formVisivel, setFormVisivel] = React.useState(false);
	
	return (
		<StyledRegisterVideo>
			<button className="add-video" onClick={() => setFormVisivel(true)}>
				+
			</button>
			{formVisivel
				? (
				<form onSubmit={(evento) => {
					evento.preventDefault();

					supabase.from("video").insert({
						title: formCadastro.values.titulo,
						url: formCadastro.values.url,
						thumb: getThumbnail(formCadastro.value.url),
						playlist: "jogos",
					})
					.then((oqueveio) => {
						console.log(oqueveio);
					})
					.catch((err) => {
						console.log(err);
					})

					setFormVisivel(false);
					formCadastro.clearForm();
				}}>
					<div>
						<button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
							x
						</button>
						<input 
							placeholder="Título do vídeo" 
							name="titulo"
							value={formCadastro.values.titulo} 
							onChange={formCadastro.handleChange} 
						/>
						<input 
							placeholder="URL" 
							name="url"
							value={formCadastro.values.url}
							onChange={formCadastro.handleChange}
						/>
						<button type="submit">
							Cadastrar
						</button>
					</div>
				</form>
				)
				:false }				
		</StyledRegisterVideo>
	)
}