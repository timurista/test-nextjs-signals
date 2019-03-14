import React from 'react'
import axios from 'axios';
import { headers, baseURL } from "@Api/Elasticsearch";
import { start } from 'repl';

export interface RenderProps {
  style: any,
  item: any,
  data: any[],
  elemSize: number,
}

export interface ListProps {
  children: Function,
  elemSize: any,
  data: any[],
  onFetch?: Function,
  windowHeight: any,
  loading: boolean,
  spinner: any,
}

export interface ListState {
  startIndex: number,
  endIndex: number,
  offset: number
}

const ELEM_SIZE = 20;
const SCROLL_WINDOW_SIZE = 800;

export class List extends React.Component<ListProps, ListState> {
  static defaultProps: {
    data: [],
    elemSize: 20,
    windowHeight: 500,
    children: () => null,
    loading: false,
  }
  state = {
    startIndex: 0,
    endIndex: 20,
    offset: 0,
  }

  viewport = React.createRef();

  getMaxheight = () => {
    console.log('MAX HEIGHT', (this.props.data.length + 20) * ELEM_SIZE)
    return (this.props.data.length + 1) * ELEM_SIZE
  }

  renderChildren = () => {
    if (!this.state) return;
    const { offset, startIndex, endIndex } = this.state;
    const elemSize = this.props.elemSize || ELEM_SIZE;
    // console.log(offset, startIndex, endIndex)
    let items = [];
    let slice = this.props.data.slice(startIndex, endIndex);
    for (let i = 0; i < slice.length; i++) {
      let item = slice[i];
      // console.log(item, index)
      let style = { top: offset + (elemSize + 20 + 20) * (i), position: 'absolute' };
      items.push(this.props.children({ idx: i + startIndex, style, item }))
    }
    if (this.props.loading && this.props.spinner) {
      items.push(<div key={'scroll-spinner'} style={{ position: 'absolute', top: offset + (elemSize + 20 + 20) * slice.length, paddingBottom: 100 }}>{this.props.spinner}</div>);
    }
    console.log(items)
    return items;
  }

  getwindowIndexSize = () => {
    return ((this.props.windowHeight || SCROLL_WINDOW_SIZE) / this.props.elemSize)
  }

  getRangeIndexes = (offset: number) => {
    let startIndex = Math.floor(offset / this.props.elemSize);
    startIndex <= 0 ? 0 : startIndex - 20;
    let endIndex = startIndex + this.getwindowIndexSize() + 10;
    console.log(startIndex, endIndex)
    return [startIndex, endIndex]
  }

  handleScroll = (event) => {
    if (!this.viewport.current) return null;
    const offset = this.viewport.current.scrollTop;
    if (this.props.loading && offset > this.state.offset + 50) return;
    const [startIndex, endIndex] = this.getRangeIndexes(offset);
    this.setState({
      startIndex,
      endIndex,
      offset
    })
    if (startIndex === this.state.startIndex && this.state.endIndex === endIndex) return;


    // reached end of list
    console.log('REACHED END', offset, this.props.data.length)
    if (!this.props.loading && endIndex >= Math.floor(this.props.data.length * 0.8) - 1) {
      if (this.props.onFetch) this.props.onFetch(endIndex)
    }
  }

  render() {
    return (
      <div onScroll={this.handleScroll} style={{ position: 'relative', display: 'grid', height: SCROLL_WINDOW_SIZE, overflow: 'auto' }} ref={this.viewport}  >
        <div style={{ height: this.getMaxheight(), position: 'relative' }}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

export interface Props {
  spinner: any,
}

export interface State {
  data: any[],
  loading: boolean,
}


export default class InfiniteLoader extends React.Component<Props, State> {
  pageSize: number = 20;
  static defaultProps = {
    spinner: <div>Loading...</div>
  }
  state = {
    loading: false,
    data: [],
  }
  handleFetch = (lastRecordIndex = 0) => {
    this.setState({ loading: true })
    let body = {
      from: lastRecordIndex,
      size: this.pageSize
    }

    let FINISH_CONDITION = 200;
    // simulate slow connection
    new Promise(resolve => setTimeout(() => {
      if (lastRecordIndex > FINISH_CONDITION) {
        this.setState({ loading: false })
        resolve()
        return;
      }
      axios.post(baseURL + '/entities/_search?q="facebook"', body, { headers }).then(({ data }: { data: any }) => {
        this.setState(prev => ({ data: prev.data.concat(data.hits.hits.map(c => c._source)), loading: false }))
        resolve()
      }).catch((e: any) => {
        this.setState({ loading: false })
        console.error(e); resolve()
      });
    }, 10));
  }

  componentDidMount() {
    this.handleFetch(0);
  }

  render() {

    return (
      <div>
        <List
          loading={this.state.loading}
          spinner={this.props.spinner}
          onFetch={this.handleFetch}
          data={this.state.data}
          windowHeight={SCROLL_WINDOW_SIZE}
          elemSize={ELEM_SIZE}
        >
          {(({ style, item, idx }: RenderProps) => (
            <div key={item.id + idx} style={{ ...style, padding: 20, border: '1px solid #ccc' }}>#{idx + 1} data: {item.name} - {item.description}</div>
          ))}
        </List>
      </div>
    )
  }
}