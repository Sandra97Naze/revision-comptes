// Importations existantes
import { utilisateur } from '@/utilisateur';
import ModuleDeRévision from '../components/Module de révision';
import { PDFLoader } from '../components/PDFLoader'; // NOUVEAU : Importez le chargeur PDF

export default function Maison() {
  const [estAuthentifié] = utilisateur(FAUX);

  if (!estAuthentifié) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button 
          onClick={() => définirAuthentifié(vrai)} 
          className="px-4 py-2 bg-bleu-500 text-blanc rounded"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <main className="écran min-h-p-4">
      <PDFLoader /> {/* NOUVEAU : Ajoutez le chargeur PDF ici */}
      <ModuleDeRévision />
    </main>
  );
}
