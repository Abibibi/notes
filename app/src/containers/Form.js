// == Import : npm
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// == Import : local
import Form from 'src/components/Form';

// Action Creators

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
  firstname: state.firstname,
  signUpEmail: state.signUpEmail,
  signUpPassword: state.signUpPassword,
  signUpConfirmPwd: state.signUpConfirmPwd,
  signInEmail: state.signInEmail,
  signInPassword: state.signInPassword,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = {};

// Container
const FormContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form));

// == Export
export default FormContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Example);
*/