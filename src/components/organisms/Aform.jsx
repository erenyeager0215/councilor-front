import { useLoginUser } from '../../hooks/useLoginUser';
import { getCouncilor } from '../../councilors';


export const Aform=()=> {
    return (
      <Panel title="Welcome">
        <LoginButton />
      </Panel>
    );
  }
  
  function LoginButton() {
    const {
      currentUser,
      setCurrentUser
    } = useLoginUser();
  
    if (currentUser !== null) {
      return <p>You logged in as {currentUser.name}.</p>;
    }
  
    return (
      <Button onClick={async() => {
        const councilor =await getCouncilor(1);  
        setCurrentUser(councilor);
        console.log(councilor);
      }}>Log in as Advika</Button>
    );
  }
  
  function Panel({ title, children }) {
    return (
      <section className="panel">
        <h1>{title}</h1>
        {children}
      </section>
    )
  }
  
  function Button({ children, onClick }) {
    return (
      <button className="button" onClick={onClick}>
        {children}
      </button>
    );
  }