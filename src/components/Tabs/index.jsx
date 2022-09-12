import React from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";

class Tabs extends React.Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label
        };
    }
    
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;
    
        return (
            <div className="row">
                <div className="col-3">
                    <ul className="nav flex-column nav-pills">
                        {children.map((child) => {
                            const { label } = child.props;
                
                            return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                            );
                        })}
                    </ul>
                </div>
                <div className="col-9">
                    <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabs;