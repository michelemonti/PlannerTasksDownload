import { getSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchPlannerPlans, fetchTasksForPlan } from "../lib/planner";  // Importa le funzioni
import { saveAs } from 'file-saver';
import { CSVLink } from "react-csv";  // Importa il componente per il download CSV

export default function Home({ session }) {
  const [plans, setPlans] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (session && session.accessToken) {
      // Recupera i piani
      fetchPlannerPlans(session.accessToken)
        .then((data) => {
          setPlans(data.value); // `data.value` contiene i piani
        })
        .catch((error) => {
          console.error("Errore nel recupero dei piani:", error);
        });
    }
  }, [session]);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    fetchTasksForPlan(planId, session.accessToken)
      .then((data) => {
        setTasks(data.value); // `data.value` contiene i task del piano selezionato
      })
      .catch((error) => {
        console.error("Errore nel recupero dei task:", error);
      });
  };

  const headers = [
    { label: "Task Title", key: "title" },
    { label: "Task ID", key: "id" }
  ];

  return (
    <div>
      <h1>Benvenuto, {session?.user?.name}</h1>
      <p>Questa è un'applicazione per scaricare task di Microsoft Planner.</p>
      <p>Client ID: {session?.user?.email}</p>

      <h2>Seleziona un piano di Planner:</h2>
      <ul>
        {plans.length === 0 && <p>Nessun piano disponibile.</p>}
        {plans.map((plan) => (
          <li key={plan.id}>
            <button onClick={() => handlePlanSelect(plan.id)}>{plan.title}</button>
          </li>
        ))}
      </ul>

      {selectedPlan && tasks.length > 0 && (
        <div>
          <h2>Task del piano selezionato:</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
          <button>
            <CSVLink data={tasks} headers={headers} filename={`tasks_${selectedPlan}.csv`}>
              Scarica Task in CSV
            </CSVLink>
          </button>
        </div>
      )}

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
