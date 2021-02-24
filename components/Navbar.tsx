import {Avatar, Header, StyledOcticon} from "@primer/components";
import React from "react";
import {MarkGithubIcon} from "@primer/octicons-react";

const Navbar = () => {
    return <Header>
        <Header.Item>
            <Header.Link href="#" fontSize={2}>
                <span>Brown Recreation</span>
            </Header.Link>
        </Header.Item>
        <Header.Item full></Header.Item>
        <Header.Item mr={0}>
            <Avatar
                src="https://github.com/octocat.png"
                size={20}
                square
                alt="@octocat"
            />
        </Header.Item>
    </Header>
}

export default Navbar