import TheAccordion from "../../components/psychologists-detail/TheAccordion";
import PsychologistsService from "../../services/PsychologistsService";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const PsychologistsDetail = () => {
  const router = useRouter();
  let { id } = router.query;

  const [psychologist, setPsychologist] = useState({});

  useEffect(() => {
    const fetchPsychologist = async (id) => {
      const data = (await PsychologistsService.detail(id)).data;
      setPsychologist(data);
    };
    fetchPsychologist(id);
  }, []);

  const accordionData = [
    {
      id: 1,
      title: "¿En cuáles modelos terapéuticos acredita formación?",
      content: "therapeutic_model",
    },
    {
      id: 2,
      title:
        "Otras formaciones realizadas que puedan ayudar a especificar tu perfil profesional",
      content: "specialization",
    },
    {
      id: 3,
      title: "Población de trabajo",
      content: "work_population",
    },
    {
      id: 4,
      title: "Identidad de Género",
      content: "gender",
    },
    {
      id: 5,
      title: "Tipo de Matrícula",
      content: "registration_type",
    },
    {
      id: 6,
      title:
        "Número de Matrícula (en caso de tener MN y MP, poner ambas en ese orden)",
      content: "registration_number",
    },
    {
      id: 7,
      title:
        "Añada el nombre de la institución o servicio en salud mental en caso de formar parte",
      content: "institution",
    },
    {
      id: 8,
      title: "¿Integra un equipo de salud con Médicx Psiquiatra?",
      content: "team",
    },
    {
      id: 9,
      title: "Mayor grado académico alcanzado",
      content: "education",
    },
    {
      id: 10,
      title: "Formación en Perspectiva de Género/LGBTIQ+",
      content: "gender_perspective",
    },
    {
      id: 11,
      title: "Modalidad de Trabajo",
      content: "work_modality",
    },
    {
      id: 12,
      title: "¿Trabaja con Obras Sociales / Prepagas?",
      content: "prepaid",
    },
    {
      id: 13,
      title: "Especificar cuáles",
      content: "prepaid_type",
    },
    {
      id: 14,
      title:
        "¿Facturás para realizar el reintegro en las Obras Sociales / Prepagas?",
      content: "invoice",
    },
    {
      id: 15,
      title: "¿Utiliza Lengua de Señas? (manejo fluido para una sesión)",
      content: "sign_language",
    },
    {
      id: 16,
      title:
        "Además de Español, ¿tiene manejo de otro/s idioma/s fluido/s para una sesión?",
      content: "session_languages",
    },
    {
      id: 17,
      title:
        "Algún dato que quieras añadir y no se haya contemplado previamente en el cuestionario",
      content: "additional_data",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = () => {
    let d = psychologist.date.split(" ");
    d = d[0].split("/");
    d = new Date(d[2] + "/" + d[1] + "/" + d[0]);
    return (
      d.getDay() + " de " + monthNames[d.getMonth()] + ", " + d.getFullYear()
    );
  };
  return (
    <>
      <Head>
        <title>
          {psychologist.name !== "" ? psychologist.name : "Unknown"}{" "}
          | Psievidencia
        </title>
      </Head>
      {psychologist != null && Object.keys(psychologist).length > 0 ? (
        <div className="container mx-auto py-28 px-5 sm:px-0">
          <button
            className="
        absolute
        top-[2rem]
        rounded-md
        w-10
        h-10
        overflow-hidden
        block
        before:bg-custom-image before:bg-no-repeat before:bg-cover before:bg-center 
        before:absolute before:inset-0
        before:block"
            onClick={() => router.back()}
          ></button>
          <h1 className="text-center font-bold text-5xl mb-5">
            {psychologist.name !== "" ? psychologist.name : "Unknown"}
          </h1>
          <h2 className="text-2xl text-center">{psychologist.email}</h2>
          <h3 className="text-1xl underline my-6">{formattedDate()}</h3>
          <div className="accordion">
            {accordionData.map(({ title, content }) => (
              <TheAccordion
                key={title}
                title={title}
                content={psychologist[content]}
              />
            ))}
          </div>
          <div>
            <p className="font-bold text-lg">Contacto</p>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="underline">Redes sociales</span>:{" "}
                {psychologist.social_networks !== "" ? (
                  <>{psychologist.social_networks}</>
                ) : (
                  <>No data</>
                )}
              </p>
              <p className="text-right">
                <span className="underline">
                  Número de teléfono o mail de contacto
                </span>
                :{" "}
                {psychologist.phone_number !== "" ? (
                  <>{psychologist.phone_number}</>
                ) : (
                  <>No data</>
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="grid place-items-center h-screen">
          Loading psychologist...
        </p>
      )}
    </>
  );
};

export default PsychologistsDetail;
