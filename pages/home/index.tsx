//#region Global Imports
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
//#endregion Global Imports

//#region Interface Imports
import { IHomePage, IStore } from "@Interfaces";
import { HomeActions } from "@Actions";
//#endregion Interface Imports

export class HomePage extends React.Component<
  IHomePage.IProps,
  IHomePage.IState
  > {
  public render(): JSX.Element {
    return (
      <div className="content">
        <div className="title"><a href="/benchmark">Bench mark different patent algorithms</a></div>
        <div className="title"><a href="/benchmark-infinite-scroll">Infinite Loader</a></div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => state.home;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  Map: bindActionCreators(HomeActions.Map, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
